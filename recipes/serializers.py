__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import serializers

# Local imports...
from .models import (
    Food, FoodCategory, Ingredient, Pantry, Recipe, RecipeCategory, UnitOfMeasure, UserFavorite, UserRating
)


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ('id', 'name', 'categories')


class CountedFoodSerializer(FoodSerializer):
    count = serializers.IntegerField()

    class Meta(FoodSerializer.Meta):
        fields = list(FoodSerializer.Meta.fields) + ['count']


class FoodCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodCategory
        fields = ('id', 'description')


class PantrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pantry
        fields = ('id', 'name', 'foods')


class BasicRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        exclude = ('description', 'instructions')


class RecipeSerializer(serializers.ModelSerializer):
    in_progress = serializers.BooleanField()

    class Meta:
        model = Recipe
        fields = ('id', 'name', 'description', 'instructions', 'in_progress')


class RecipeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeCategory
        fields = ('id', 'description')


class UnitOfMeasureSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnitOfMeasure
        fields = ('id', 'description', 'abbreviation')


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'recipe', 'food', 'amount', 'unit_of_measure', 'description')


class UserFavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavorite
        fields = ('id', 'user', 'recipe')


class UserRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRating
        fields = ('id', 'user', 'recipe', 'rating')


class UserDataSerializer(serializers.Serializer):
    is_favorite = serializers.BooleanField(default=False)
    rating = serializers.FloatField(default=None)
