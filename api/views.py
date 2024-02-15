from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, generics, status, permissions, parsers
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import UserSerializer, CouncilSerializer, PublicCouncilsSerializer, MembershipSerializer, ThesisSerializer, ReviewSerializer, PublicUserSerializer
from .models import User, Council, CouncilMembership, Thesis, Review
from api import perms, paginators

# Create your views here.


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

    def get_permissions(self):
        if self.action in ['lecturer_theses', 'lecturer_councils']:
            return [perms.LecturerPermissions()]
        return [perms.ProvostPermissions()]

    @action(methods=['patch'], detail=True, url_path='toggle-active')
    def toggle_active(self, request, pk):
        council = self.get_object()
        council.is_active = not council.is_active
        council.save()
        data = CouncilSerializer(council).data
        return Response(data)

    @action(methods=['get'], detail=True, url_path='members')
    def get_members(self, request, pk):
        # council = self.get_object()
        members = CouncilMembership.objects.filter(council=pk)
        data = MembershipSerializer(members, many=True).data

        return Response(data)

    @action(methods=['post'], detail=True, url_path='add-member')
    def add_member(self, request, pk):
        council = self.get_object()
        user = User.objects.filter(role='lecturer').get(
            pk=request.data.get('user'))
        users = CouncilMembership.objects.filter(
            council=council).filter(user=user.id)

        if len(users) != 0:
            return Response({"Message": "User was exist in this Council"})

        new_member = CouncilMembership.objects.create(
            user=user, council=council, council_role=request.data.get('council_role'))
        data = MembershipSerializer(new_member).data
        return Response(data, status=status.HTTP_201_CREATED)

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

        return Response({'message': 'Member updated successfully'})

    @action(methods=['get'], detail=False, url_path='lecturer-councils')
    def lecturer_councils(self, request):
        myCouncils = request.user.councils.all()
        councils = self.queryset.filter(id__in=myCouncils)
        data = CouncilSerializer(councils, many=True).data
        return Response(data)

    @action(methods=['get'], detail=True, url_path='lecturer-theses')
    def lecturer_theses(self, request, pk):
        theses = Thesis.objects.filter(council=pk)
        data = ThesisSerializer(theses, many=True).data
        return Response(data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='theses')
    def council_theses(self, request, pk):
        theses = Thesis.objects.filter(council=pk)
        data = ThesisSerializer(theses, many=True).data
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

        return Response({'message': 'Members updated successfully'})

    @action(methods=['patch'], detail=True, url_path='add-thesis')
    def add_thesis(self, request, pk):
        council = self.get_object()
        thesis_data = request.data.get('thesis')
        try:
            thesis = Thesis.objects.get(pk=thesis_data)
            thesis.council = council
            thesis.save()
            return Response(ThesisSerializer(thesis).data, status=status.HTTP_200_OK)
        except Exception as ex:
            return Response({'error': str(ex)}, status=status.HTTP_404_NOT_FOUND)


class ThesisViewset(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Thesis.objects.all()
    serializer_class = ThesisSerializer

    def get_permissions(self):
        if self.action in ['add_review', 'update_review']:
            return [perms.LecturerPermissions()]
        elif self.action.__eq__('get_reviews') or self.request.method == 'GET':
            return [permissions.IsAuthenticated()]
        elif self.action in ['add_thesis', 'my_thesis']:
            return [perms.StudentPermissions()]
        return [perms.ProvostPermissions()]

    @action(methods=['post'], url_path='add-thesis', detail=False)
    def add_thesis(self, request):
        title = request.data.get('title')
        files = request.data.get('files')
        students_id = request.data.get('students', [])
        supervisors_id = request.data.get('supervisors', [])

        try:
            students = User.objects.filter(pk__in=students_id)
            supervisors = User.objects.filter(pk__in=supervisors_id)

            # Create the thesis without assigning students and supervisors
            new_thesis = Thesis.objects.create(title=title, files=files)

            # Now use set() to assign students and supervisors
            new_thesis.students.set(students)
            new_thesis.supervisors.set(supervisors)

            data = ThesisSerializer(new_thesis).data

            return Response(data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=False, url_path="my-thesis")
    def my_thesis(self, request):
        myThesis = request.user.theses.all()
        if myThesis.exists():
            data = ThesisSerializer(myThesis[0]).data
            return Response(data, status=status.HTTP_200_OK)
        return Response(None)

    @action(methods=['get'], detail=False, url_path="not-active")
    def not_active(self, request):
        theses = Thesis.objects.filter(is_active=False)
        data = ThesisSerializer(theses, many=True).data
        return Response(data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path="active")
    def active(self, request):
        theses = Thesis.objects.filter(is_active=True)
        data = ThesisSerializer(theses, many=True).data
        return Response(data, status=status.HTTP_200_OK)

    @action(methods=['patch'], detail=True, url_path="toggle-active")
    def toggle_active(self, request, pk):
        theses = Thesis.objects.filter(is_active=False)
        thesis = theses.get(pk=pk)
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
        return Response(data)

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
        return Response(data)

    @action(methods=['get'], detail=True, url_path='reviews')
    def get_reviews(self, request, pk):
        thesis = self.get_object()
        reviews = Review.objects.filter(thesis=thesis)

        data = ReviewSerializer(reviews, many=True).data
        return Response(data)

    @action(methods=['get'], detail=True, url_path='my-review')
    def my_review(self, request, pk):
        thesis = self.get_object()
        myReview = request.user.reviews.filter(thesis=thesis)[0]
        data = ReviewSerializer(myReview).data
        return Response(data)


class PublicUserViewset(viewsets.ViewSet, generics.ListAPIView):
    serializer_class = PublicUserSerializer
    queryset = User.objects.filter(role__in=['student', 'lecturer'])

    def get_queryset(self):
        queries = self.queryset
        filter = self.request.query_params.get('filter')

        if filter:
            queries = queries.filter(role=filter)

        return queries


class CouncilListViewset(viewsets.ViewSet, generics.ListAPIView):
    serializer_class = PublicCouncilsSerializer
    queryset = Council.objects.all()
