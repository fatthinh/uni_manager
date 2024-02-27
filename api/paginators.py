from rest_framework.pagination import PageNumberPagination


class UserPaginator(PageNumberPagination):
    page_size = 8


class Paginator(PageNumberPagination):
    page_size = 6
