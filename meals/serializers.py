__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import serializers

# Local imports...
from .models import Dish, Ingredient


class DishSerializer(serializers.ModelSerializer):
    ingredient_ids = serializers.SerializerMethodField()

    def get_ingredient_ids(self, obj):
        return getattr(obj, 'ingredient_ids', [])

    class Meta:
        model = Dish
        fields = ('id', 'name', 'ingredient_ids')


class IngredientSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()

    def get_count(self, obj):
        return getattr(obj, 'count', 0)

    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'count')
