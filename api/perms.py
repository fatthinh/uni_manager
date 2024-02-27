from rest_framework import permissions
from django.contrib.auth.models import Group

class OwnerAuthenticated(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        print(obj.students)
        return self.has_permission(request, view) and request.user in obj.students


class IsStudentOfThesis(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        # Check if the authenticated user is one of the students associated with the thesis
        return request.user in obj.students.all()


class RolePermissions(permissions.IsAuthenticated):
    def __init__(self, role):
        self.role = role

    def has_permission(self, request, view):
        # Group permissions
        group = Group.objects.get(name__icontains=self.role)
        group_permissions = {
            permission.codename for permission in group.permissions.all()}

        # User permissions
        user_permissions = request.user.get_all_permissions()
        user_perms_normalization = {permission_codename.split(
            '.')[1] for permission_codename in user_permissions}

        for perm in group_permissions:
            if not perm in user_perms_normalization:
                return False
        return True


class ProvostPermissions(RolePermissions):
    def __init__(self):
        super().__init__('provost')


class StudentPermissions(RolePermissions):
    def __init__(self):
        super().__init__('student')


class LecturerPermissions(RolePermissions):
    def __init__(self):
        super().__init__('lecturer')
