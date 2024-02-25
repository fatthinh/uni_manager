from django.urls import path, include
from rest_framework import routers
from .views import UserViewset, CouncilViewset, ThesisViewset, PublicUserViewset, PlotAPIView
router = routers.DefaultRouter()
router.register('users', UserViewset)
router.register('councils', CouncilViewset)
router.register('theses', ThesisViewset)
router.register('public-users', PublicUserViewset)


urlpatterns = [
    path('', include(router.urls)),
    path('plot/', PlotAPIView.as_view(), name='plot-api'),
]
