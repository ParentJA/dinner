__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.conf.urls import url

# Local imports...
from .views import PantryAPIView

urlpatterns = [
    url(r'^$', PantryAPIView.as_view()),
]
