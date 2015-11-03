__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.conf.urls import url

# Local imports...
from .views import FoodAPIView, PantryAPIView, PantryFoodAPIViewSet, RecipeAPIViewSet

urlpatterns = [
    url(r'^foods/$', FoodAPIView.as_view()),
    url(r'^pantries/$', PantryAPIView.as_view()),
    url(r'^pantries/(?P<pantry_id>\d+)/foods/(?P<food_id>\d+)/$', PantryFoodAPIViewSet.as_view({
        'post': 'create',
        'put': 'update',
        'delete': 'destroy'
    })),
    url(r'^recipes/(?P<pk>\d+)/$', RecipeAPIViewSet.as_view({'get': 'retrieve'})),
    url(r'^recipes/$', RecipeAPIViewSet.as_view({'get': 'list'})),
]
