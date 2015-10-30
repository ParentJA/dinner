__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.conf.urls import url

# Local imports...
from .views import PantryAPIView, PantryIngredientAPIView

urlpatterns = [
    url(r'^$', PantryAPIView.as_view()),
    url(r'^ingredients/(?P<ingredient_id>\d+)/$', PantryIngredientAPIView.as_view()),
]
