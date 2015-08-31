__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.conf.urls import url

# Local imports...
from .views import DishAPIView, IngredientAPIView

urlpatterns = [
    url(r'^dishes/$', DishAPIView.as_view()),
    url(r'^dishes/(?P<pk>\d+)/$', DishAPIView.as_view()),
    url(r'^ingredients/$', IngredientAPIView.as_view()),
    url(r'^ingredients/(?P<pk>\d+)/$', IngredientAPIView.as_view()),
]
