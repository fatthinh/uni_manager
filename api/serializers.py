from rest_framework import serializers
from .models import User, Council, CouncilMembership, Thesis, Review
from django.contrib.auth.models import Group


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name',
                  'username', 'email', 'password', 'role', 'avatar']

        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        user_password = validated_data.get('password', None)
        user = self.Meta.model(**validated_data)
        user.set_password(user_password)
        user.save()

        role = validated_data.get('role')
        user.groups.add(Group.objects.get(name__icontains=role))
        return user


class PublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'get_full_name', 'role', 'avatar']


class CouncilSerializer(serializers.ModelSerializer):
    members = PublicUserSerializer(many=True, read_only=True)

    class Meta:
        model = Council
        fields = ('__all__')


class MembershipSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(
        source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = CouncilMembership
        fields = ('__all__')


class ThesisSerializer(serializers.ModelSerializer):
    students = PublicUserSerializer(many=True)
    supervisors = PublicUserSerializer(many=True)
    council = serializers.SerializerMethodField()
    files = serializers.SerializerMethodField()

    class Meta:
        model = Thesis
        fields = ('__all__')

    def get_files(self, obj):
        request = self.context.get('request')
        if request is not None and obj.files:
            return request.build_absolute_uri(f'/static/{obj.files}')
        return f'/static/{obj.files}'

    def get_council(self, obj):
        council_data = CouncilSerializer(obj.council).data
        council_data.pop('members', None)
        return council_data


class ReviewSerializer(serializers.ModelSerializer):
    author_firstname = serializers.CharField(
        source='reviewer.first_name', read_only=True)
    author_lastname = serializers.CharField(
        source='reviewer.last_name', read_only=True)
    author_email = serializers.CharField(
        source='reviewer.email', read_only=True)

    class Meta:
        model = Review
        fields = ('__all__')
