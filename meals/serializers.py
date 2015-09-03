__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import serializers

# Local imports...
from .models import Cuisine, Dish, Ingredient, Source


class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = ('id', 'name')


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ('id', 'name', 'ingredients', 'source', 'cuisine')


class IngredientSerializer(serializers.ModelSerializer):
    count = serializers.IntegerField()

    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'count')


class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = ('id', 'title')
