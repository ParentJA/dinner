__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Standard library imports...
from itertools import chain

# Third-party imports...
from rest_framework import generics, permissions, status, views
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

# Django imports...
from django.contrib.auth import get_user_model
from django.http import Http404

# Local imports...
from .models import Food, Recipe, Pantry, PantryFood, UnitOfMeasure, UserPantry
from .serializers import (
    BasicRecipeSerializer, FoodSerializer, FoodCategorySerializer, PantrySerializer, RecipeSerializer,
    RecipeCategorySerializer
)

User = get_user_model()


def get_user_pantry_or_404(user, pantry_id):
    try:
        return UserPantry.objects.select_related('user', 'pantry').get(user=user, pantry__pk=pantry_id)
    except UserPantry.DoesNotExist:
        raise Http404


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


class PantryFoodAPIView(views.APIView):
    def post(self, request, pantry_id, food_id):
        # Retrieve data parameters...
        amount = float(request.data.get('amount'))
        unit_of_measure_id = int(request.data.get('unit_of_measure'))
        unit_of_measure = get_object_or_404(UnitOfMeasure, pk=unit_of_measure_id)

        # Retrieve pantry...
        user_pantry = get_user_pantry_or_404(request.user, pantry_id=pantry_id)

        # Retrieve food...
        food = get_object_or_404(Food, pk=food_id)

        # Find pantry food...
        try:
            PantryFood.objects.select_related('pantry', 'food').get(pantry__pk=pantry_id, food__pk=food_id)

            return Response(status=status.HTTP_400_BAD_REQUEST, data={
                'message': 'The specified food is already in your pantry.'
            })

        except PantryFood.DoesNotExist:
            PantryFood.objects.create(
                pantry=user_pantry.pantry,
                food=food,
                amount=amount,
                unit_of_measure=unit_of_measure
            )

        return Response(status=status.HTTP_201_CREATED)

    def put(self, request, pantry_id, food_id):
        # Retrieve data parameters...
        amount = float(request.data.get('amount'))
        unit_of_measure_id = int(request.data.get('unit_of_measure'))
        unit_of_measure = get_object_or_404(UnitOfMeasure, pk=unit_of_measure_id)

        # Retrieve pantry...
        get_user_pantry_or_404(request.user, pantry_id=pantry_id)

        # Retrieve food...
        get_object_or_404(Food, pk=food_id)

        # Find pantry food...
        try:
            pantry_food = PantryFood.objects.select_related('pantry', 'food').get(
                pantry__pk=pantry_id, food__pk=food_id
            )

        except PantryFood.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={
                'message': 'The specified food is not in your pantry.'
            })

        else:
            pantry_food.amount = amount
            pantry_food.unit_of_measure = unit_of_measure
            pantry_food.save()

        return Response(status=status.HTTP_200_OK)

    def delete(self, request, pantry_id, food_id):
        # Retrieve pantry...
        get_user_pantry_or_404(request.user, pantry_id=pantry_id)

        # Find pantry food...
        try:
            PantryFood.objects.select_related('pantry', 'food').get(
                pantry__pk=pantry_id, food__pk=food_id
            ).delete()

        except PantryFood.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={
                'message': 'The specified food is not in your pantry.'
            })

        return Response(status=status.HTTP_200_OK)


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
