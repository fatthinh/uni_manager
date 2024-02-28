from rest_framework import permissions


class CouncilPermissions(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        model = 'council'

        required_permissions = {
            'GET': request.user.has_perm(f'api.view_{model}'),
            'PATCH': request.user.has_perm(f'api.change_{model}',),
            'DELETE': request.user.has_perm(f'api.delete_{model}'),
            'POST': request.user.has_perm(f'api.add_{model}')
        }
        if getattr(view, 'action').__eq__('council_theses') and request.user.role.__eq__("LECTURER"):
            pk = view.kwargs.get('pk')
            return int(pk) in list(request.user.councils.all().values_list('id', flat=True))

        return required_permissions[request.method]


class ReviewPermissions(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        model = 'review'
        required_permissions = {
            'GET': request.user.has_perm(f'api.view_{model}'),
            'PATCH': request.user.has_perm(f'api.change_{model}',),
            'DELETE': request.user.has_perm(f'api.delete_{model}'),
            'POST': request.user.has_perm(f'api.add_{model}')
        }

        return required_permissions[request.method]


class ThesisPermissions(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        model = 'thesis'

        if getattr(view, 'action').__eq__('toggle_active'):
            return request.user.role.__eq__('PROVOST')

        required_permissions = {
            'GET': request.user.has_perm(f'api.view_{model}'),
            'PATCH': request.user.has_perm(f'api.change_{model}',),
            'DELETE': request.user.has_perm(f'api.delete_{model}'),
            'POST': request.user.has_perm(f'api.add_{model}')
        }

        return required_permissions[request.method]
