__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import serializers

# Local imports...
from .models import Pantry


class PantrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pantry
        fields = ('id', 'name', 'ingredients')
