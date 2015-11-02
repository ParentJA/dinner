__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Standard library imports...
from itertools import chain

# Third-party imports...
from rest_framework import permissions, status, views
from rest_framework.response import Response

# Django imports...
from django.contrib.auth import get_user_model

# Local imports...
from .models import Food, Recipe, UserPantry
from .serializers import (
    BasicRecipeSerializer, FoodSerializer, FoodCategorySerializer, PantrySerializer, RecipeSerializer,
    RecipeCategorySerializer
)

User = get_user_model()


class FoodAPIView(views.APIView):
    def get(self, request):
        # Get parameters...
        use_categories = request.query_params.get('categories', False)

        # Prepare response data...
        data = {}

        # Add foods...
        foods = Food.objects.prefetch_related('categories')

        data['foods'] = FoodSerializer(foods, many=True).data

        # Add food categories...
        if use_categories:
            food_categories = set(chain.from_iterable([c for c in [food.categories.all() for food in foods]]))

            data['food_categories'] = FoodCategorySerializer(food_categories, many=True).data

        return Response(status=status.HTTP_200_OK, data=data)


class PantryAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Prepare response data...
        data = {}

        # Add pantries...
        user_pantries = UserPantry.objects.select_related('user', 'pantry').filter(user=request.user)
        pantries = set([u.pantry for u in user_pantries])

        data['pantries'] = PantrySerializer(pantries, many=True).data

        return Response(status=status.HTTP_200_OK, data=data)


class RecipeAPIView(views.APIView):
    def get(self, request, pk=None):
        # Get parameters...
        use_categories = request.query_params.get('categories', False)

        # Prepare response data...
        data = {}

        # Add recipes...
        if pk is not None:
            try:
                recipe = Recipe.objects.prefetch_related('categories', 'foods').get(id=pk)
            except Recipe.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                data['recipes'] = RecipeSerializer([recipe], many=True).data

        else:
            recipes = Recipe.objects.prefetch_related('categories', 'foods').defer('description', 'instructions')
            data['recipes'] = BasicRecipeSerializer(recipes, many=True).data

        # Add recipe categories...
        if use_categories:
            recipe_categories = set(chain.from_iterable([c for c in [recipe.categories.all() for recipe in recipes]]))

            data['recipe_categories'] = RecipeCategorySerializer(recipe_categories, many=True).data

        return Response(status=status.HTTP_200_OK, data=data)
