__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.conf.urls import url

# Local imports...
from .views import FoodAPIView, PantryAPIView, PantryFoodAPIView, RecipeAPIView

urlpatterns = [
    url(r'^foods/$', FoodAPIView.as_view()),
    url(r'^pantries/$', PantryAPIView.as_view()),
    url(r'^pantries/(?P<pantry_id>\d+)/foods/(?P<food_id>\d+)/$', PantryFoodAPIView.as_view()),
    url(r'^recipes/(?P<pk>\d+)/$', RecipeAPIView.as_view()),
    url(r'^recipes/$', RecipeAPIView.as_view()),
]
