import base64
from io import BytesIO
import matplotlib.pyplot as plt
import matplotlib
import numpy as np
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, generics, status, permissions, parsers
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import UserSerializer, CouncilSerializer, MembershipSerializer, ThesisSerializer, ReviewSerializer, PublicUserSerializer
from .models import User, Council, CouncilMembership, Thesis, Review
from api import perms, paginators
from django.db.models import Q, F, Value, Avg
from django.db.models.functions import Concat
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth import authenticate


class UserViewset(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    pagination_class = paginators.UserPaginator
    parser_classes = [parsers.MultiPartParser, parsers.JSONParser]

    def get_permissions(self):
        if self.action.__eq__('current_user') or self.request.method == 'PATCH':
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

    @action(methods=['get'], detail=False, url_path='current-user')
    def current_user(self, request):
        return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)

    @action(methods=['patch'], detail=False, url_path='change-password')
    def change_password(self, request):
        user = get_object_or_404(User, pk=request.user.id)

        oldPw = request.data.get('password')
        newPw = request.data.get('new_password')

        if authenticate(request, username=user.username, password=oldPw):
            user.set_password(newPw)
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        return Response({'message': 'wrong password'}, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        queries = self.queryset
        search = self.request.query_params.get('search')
        filter = self.request.query_params.get('filter')

        if filter and filter != 'all':
            queries = queries.filter(role=filter)

        if search:
            queries = queries.filter(username__icontains=search)
        return queries


class CouncilViewset(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView, generics.RetrieveUpdateAPIView):
    serializer_class = CouncilSerializer
    queryset = Council.objects.all()
    pagination_class = paginators.Paginator
    permission_classes = [perms.CouncilPermissions]

    def get_queryset(self):
        queries = self.queryset
        q = self.request.query_params.get('search')

        if q:
            queries = queries.filter(name__icontains=q)
        return queries

    @action(methods=['patch'], detail=True, url_path='toggle-active')
    def toggle_active(self, request, pk):
        council = self.get_object()
        council.is_active = not council.is_active
        council.save()
        if not council.is_active:
            theses = Thesis.objects.filter(council=council)
            for thesis in theses:
                reviews = Review.objects.filter(thesis=thesis)
                if reviews:
                    average_score = reviews.aggregate(
                        avg_score=Avg('final_score'))['avg_score']

                    for student in thesis.students.all():
                        subject = "KẾT QUẢ KHÓA LUẬN TỐT NGHIỆP"
                        message = f'Hi {student.last_name}, Kết quả bài khóa luận: {round(average_score, 2)}'
                        email_from = settings.EMAIL_HOST_USER
                        recipient_list = [student.email, ]
                        send_mail(subject, message, email_from, recipient_list)

        return Response(council.is_active)

    @action(methods=['get'], detail=True, url_path='members')
    def get_members(self, request, pk):
        # council = self.get_object()
        members = CouncilMembership.objects.filter(council=pk)
        data = MembershipSerializer(members, many=True).data

        return Response(data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='update-members')
    def update_members(self, request, pk):
        council_instance = get_object_or_404(Council, pk=pk)
        updated_members = set(request.data.get('members', []))

        old_members = set(CouncilMembership.objects.filter(
            council=council_instance).values_list('user', flat=True))

        if old_members == updated_members:
            return Response({'message': 'No changes'})

        members_to_remove = old_members - updated_members
        members_to_add = updated_members - old_members

        if members_to_remove:
            CouncilMembership.objects.filter(
                council=council_instance, user__in=members_to_remove).delete()

        new_memberships = [
            CouncilMembership(council=council_instance,
                              user=User.objects.get(pk=user_id), council_role="MEMBER")
            for user_id in members_to_add
        ]

        CouncilMembership.objects.bulk_create(new_memberships)
        return Response({'message': 'Members updated successfully'})

    @action(methods=['patch'], detail=True, url_path='update-member-role')
    def update_member_role(self, request, pk):
        council_instance = get_object_or_404(Council, pk=pk)
        role = request.data.get('role', None)
        user_id = request.data.get('user_id', None)
        user = User.objects.get(pk=user_id)
        member = CouncilMembership.objects.filter(
            council=council_instance, user=user).first()

        member.council_role = role
        member.save()

        if (role == 'REVIEWER'):
            subject = council_instance.name
            message = f'Hi {user.last_name}, You are assigned to be a review member.'
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [user.email, ]
            send_mail(subject, message, email_from, recipient_list)

        return Response({'message': 'Member updated successfully'})

    @action(methods=['get'], detail=False, url_path='lecturer-councils')
    def lecturer_councils(self, request):
        my_councils = request.user.councils.all()

        # Filter and search councils
        councils = self.queryset.filter(id__in=my_councils)
        search = self.request.query_params.get('search')
        if search:
            councils = councils.filter(name__icontains=search)

        paginator = self.pagination_class()
        paginated_councils = paginator.paginate_queryset(councils, request)
        data = CouncilSerializer(paginated_councils, many=True).data
        return paginator.get_paginated_response(data)

    @action(methods=['get'], detail=True, url_path='theses')
    def council_theses(self, request, pk):
        council = self.get_object()
        theses = Thesis.objects.filter(council=pk)
        data = ThesisSerializer(theses, many=True).data
        if not council.is_active and request.user.role == 'LECTURER':
            return Response({'message': 'Council was locked!!'}, status=status.HTTP_423_LOCKED)
        return Response(data, status=status.HTTP_200_OK)

    @action(methods=['patch'], detail=True, url_path='update-theses')
    def update_council_theses(self, request, pk):
        council_instance = get_object_or_404(Council, pk=pk)
        new_theses = set(request.data.get('theses', []))
        old_theses = Thesis.objects.filter(council=council_instance)

        if new_theses == set(old_theses.values_list('id', flat=True)):
            return Response({'message': 'No changes'})

        theses_to_remove = old_theses.exclude(id__in=new_theses)
        theses_to_add = Thesis.objects.filter(id__in=new_theses)

        theses_to_remove.update(council=None)
        theses_to_add.update(council=council_instance)

        return Response({'message': 'Theses updated successfully'})


class ThesisViewset(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Thesis.objects.all()
    serializer_class = ThesisSerializer
    parser_classes = [parsers.MultiPartParser, parsers.JSONParser]
    pagination_class = paginators.Paginator

    def get_permissions(self):
        if self.action in ['add_review', 'update_review', 'my_review']:
            return [perms.ReviewPermissions()]
        return [perms.ThesisPermissions()]

    @action(methods=['post'], url_path='create-thesis', detail=False)
    def create_thesis(self, request):
        title = request.data.get('title')
        major = request.data.get('major')
        description = request.data.get('description')
        students_id = request.data.get('students', [])
        supervisors_id = request.data.get('supervisors', [])

        try:
            students = User.objects.filter(pk__in=students_id)
            supervisors = User.objects.filter(pk__in=supervisors_id)

            # Create the thesis without assigning students and supervisors
            new_thesis = Thesis.objects.create(
                title=title,  major=major, description=description)

            # Now use set() to assign students and supervisors
            new_thesis.students.set(students)
            new_thesis.supervisors.set(supervisors)

            data = ThesisSerializer(new_thesis).data
            return Response(data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['patch'], url_path='update-thesis', detail=True)
    def update_thesis(self, request, pk):
        thesis = self.get_object()
        fields_to_update = ['title', 'major',
                            'description', 'students', 'supervisors']

        try:
            for field in fields_to_update:
                if field in request.data:
                    data = request.data[field]
                    if isinstance(data, list):
                        users = User.objects.filter(pk__in=data)
                        getattr(thesis, field).set(users)
                    else:
                        setattr(thesis, field, data)
            thesis.save()

            data = ThesisSerializer(thesis).data
            return Response(data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=False, url_path="my-thesis")
    def my_thesis(self, request):
        myThesis = request.user.theses.all()
        if myThesis.exists():
            data = ThesisSerializer(myThesis[0]).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({"message": "You have no thesis"}, status=status.HTTP_404_NOT_FOUND)

    @action(methods=['get'], detail=False, url_path="not-active")
    def not_active(self, request):
        theses = Thesis.objects.filter(is_active=False)

        search = self.request.query_params.get('search')
        if search:
            theses = theses.filter(title__icontains=search)

        paginator = self.pagination_class()
        paginated_theses = paginator.paginate_queryset(theses, request)
        data = ThesisSerializer(paginated_theses, many=True).data
        return paginator.get_paginated_response(data)

    @action(methods=['get'], detail=False, url_path="active")
    def active(self, request):
        theses = Thesis.objects.filter(is_active=True)

        search = self.request.query_params.get('search')
        if search:
            theses = theses.filter(title__icontains=search)

        paginator = self.pagination_class()
        paginated_theses = paginator.paginate_queryset(theses, request)

        data = ThesisSerializer(paginated_theses, many=True).data
        return paginator.get_paginated_response(data)

    @action(methods=['get'], detail=False, url_path="not-council")
    def not_council(self, request):
        filtered_theses = Thesis.objects.filter(
            is_active=True, council__isnull=True)
        serialized_theses = ThesisSerializer(filtered_theses, many=True).data
        return Response(serialized_theses, status=status.HTTP_200_OK)

    @action(methods=['patch'], detail=True, url_path="toggle-active")
    def toggle_active(self, request, pk):
        thesis = self.get_object()
        thesis.is_active = not thesis.is_active
        thesis.save()
        data = ThesisSerializer(thesis).data
        return Response(data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='add-review')
    def add_review(self, request, pk):
        thesis = self.get_object()
        presentation_score = request.data.get('presentation_score')
        content_score = request.data.get('content_score')
        comment = request.data.get('comment')
        reviewer = request.user

        if not thesis.council in request.user.councils.all():
            return Response({'Message': 'Its wrong!!!'})

        if not thesis.council.is_active:
            return Response({'Message': 'Council is locked!!!'})

        review = Review.objects.create(presentation_score=float(presentation_score),
                                       content_score=float(content_score), thesis=thesis, comment=comment, reviewer=reviewer)
        data = ReviewSerializer(review).data
        return Response(data, status=status.HTTP_201_CREATED)

    @action(methods=['patch'], detail=True, url_path='update-review')
    def update_review(self, request, pk):
        thesis = self.get_object()
        presentation_score = request.data.get('presentation_score')
        content_score = request.data.get('content_score')
        comment = request.data.get('comment')
        reviewer = request.user

        if not thesis.council in request.user.councils.all():
            return Response({'Message': 'Its wrong!!!'})

        if not thesis.council.is_active:
            return Response({'Message': 'Council is locked!!!'})

        review = Review.objects.get(thesis=thesis, reviewer=reviewer)
        review.presentation_score = float(presentation_score)
        review.content_score = float(content_score)
        review.comment = comment
        review.save()

        data = ReviewSerializer(review).data
        return Response(data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='reviews')
    def get_reviews(self, request, pk):
        thesis = self.get_object()
        reviews = Review.objects.filter(thesis=thesis)
        if reviews:
            data = ReviewSerializer(reviews, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'message': 'It have no reviews'})

    @action(methods=['get'], detail=True, url_path='my-review')
    def my_review(self, request, pk):
        thesis = self.get_object()
        myReview = request.user.reviews.filter(thesis=thesis)
        if myReview:
            data = ReviewSerializer(myReview[0]).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'message': 'you dont have review'}, status=status.HTTP_404_NOT_FOUND)

    @action(methods=['patch'], detail=True, url_path='upload-files')
    def upload_files(self, request, pk):
        thesis = self.get_object()
        files_data = request.data.get('files')
        if files_data is None:
            return Response({'error': 'Missing files field in request data.'}, status=status.HTTP_400_BAD_REQUEST)

        thesis.files = files_data
        thesis.save()

        serialized_thesis = ThesisSerializer(thesis)
        return Response(serialized_thesis.data, status=status.HTTP_200_OK)


class PublicUserViewset(viewsets.ViewSet, generics.ListAPIView):
    serializer_class = PublicUserSerializer
    queryset = User.objects.all()
    pagination_class = paginators.UserPaginator

    def get_queryset(self):
        queries = self.queryset
        filter = self.request.query_params.get('filter')
        q = self.request.query_params.get('search')

        students_with_thesis = User.objects.filter(
            theses__isnull=False).distinct()

        if filter:
            queries = queries.filter(role=filter)
            if filter == 'student':
                queries = queries.exclude(
                    id__in=students_with_thesis.values('id'))

        if q:
            queries = queries.annotate(full_name=Concat(F('first_name'), Value(
                ' '), F('last_name'))).filter(full_name__icontains=q)
        return queries


matplotlib.use('Agg')


class PlotAPIView(APIView):
    def get(self, request, format=None):
        year = self.request.query_params.get('year', 2024)
        score_labels = ["0.0 - 1.9", "2.0 - 3.9",
                        "4.0 - 5.9", "6.0 - 7.9", "8.0 - 9.9", "10"]
        major_labels = ['IT', 'CS', 'ENG', 'MKT']

        score_values = [0] * 6
        major_values = [0] * 4

        theses = Thesis.objects.filter(
            reviews__isnull=False, created_at__year=year)
        for thesis in theses:
            reviews = thesis.reviews.all()
            average_score = reviews.aggregate(
                avg_score=Avg('final_score'))['avg_score']
            score_values[int(round(average_score, 1)//2)] += 1
            major_values[major_labels.index(thesis.major)] += 1

        # SCORE
        plt.bar(score_labels, score_values)

        plt.xlabel("Khoảng điểm")
        plt.ylabel("Số lượng bài khóa luận")
        y_ticks = np.arange(0, max(score_values) + 1, 1)
        plt.yticks(y_ticks)

        # Save the plot to a BytesIO object
        image_stream = BytesIO()
        plt.savefig(image_stream, format='png')
        plt.close()

        # Encode the image as base64
        score_image = base64.b64encode(
            image_stream.getvalue()).decode('utf-8')

        # MAJOR
        plt.bar(major_labels, major_values)

        plt.xlabel("Ngành")
        plt.ylabel("Số lượng bài khóa luận")
        y_ticks = np.arange(0, max(major_values) + 1, 1)
        plt.yticks(y_ticks)

        # Save the plot to a BytesIO object
        image_stream = BytesIO()
        plt.savefig(image_stream, format='png')
        plt.close()

        # Encode the image as base64
        major_image = base64.b64encode(
            image_stream.getvalue()).decode('utf-8')

        # Return the base64-encoded image as JSON
        return Response({'score_image': f'data:image/png;base64,{score_image}',
                         'major_image': f'data:image/png;base64,{major_image}'})
