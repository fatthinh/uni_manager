from django.urls import path, include
from rest_framework import routers
from .views import UserViewset, CouncilViewset, ThesisViewset, PublicUserViewset, CouncilListViewset

router = routers.DefaultRouter()
router.register('users', UserViewset)
router.register('councils', CouncilViewset)
router.register('public-councils', CouncilListViewset)
router.register('theses', ThesisViewset)
router.register('public-users', PublicUserViewset)


urlpatterns = [
    path('', include(router.urls))
]
