__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Standard library imports...
from collections import Counter
from itertools import chain

# Third-party imports...
from rest_framework import generics, permissions, status, views, viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

# Django imports...
from django.contrib.auth import get_user_model
from django.http import Http404

# Local imports...
from .models import Food, Ingredient, Recipe, Pantry, PantryFood, UnitOfMeasure, UserPantry
from .serializers import (
    BasicRecipeSerializer, CountedFoodSerializer, FoodSerializer, FoodCategorySerializer, PantrySerializer,
    RecipeSerializer, RecipeCategorySerializer, UnitOfMeasureSerializer
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

        if not user_pantries.exists():
            pantry = Pantry.objects.create(name='Home')
            user_pantries = [UserPantry.objects.create(user=request.user, pantry=pantry)]

        pantries = set([u.pantry for u in user_pantries])

        data['pantries'] = PantrySerializer(pantries, many=True).data

        return Response(status=status.HTTP_200_OK, data=data)

    def post(self, request):
        # Retrieve data parameters...
        name = request.data.get('name')

        # Prepare response data...
        data = {}

        # Create pantry...
        pantry = Pantry.objects.create(name=name)
        UserPantry.objects.create(user=request.user, pantry=pantry)

        # Retrieve pantries...
        user_pantries = UserPantry.objects.select_related('user', 'pantry').filter(user=request.user)
        pantries = set([u.pantry for u in user_pantries])

        data['pantries'] = PantrySerializer(pantries, many=True).data

        return Response(status=status.HTTP_200_OK, data=data)


class PantryFoodAPIViewSet(viewsets.ViewSet):
    def create(self, request, pantry_id, food_id):
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

    def update(self, request, pantry_id, food_id):
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

    def destroy(self, request, pantry_id, food_id):
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


class RecipeAPIViewSet(viewsets.ViewSet):
    def list(self, request):
        data = {}

        # Handle recipe list...
        recipes = Recipe.objects.prefetch_related('categories', 'foods', 'foods__categories').defer(
            'description', 'instructions'
        )

        data['recipes'] = BasicRecipeSerializer(recipes, many=True).data

        # Handle parameters...
        use_categories = request.query_params.get('categories', False)

        if use_categories:
            recipe_categories = set(chain.from_iterable([c for c in [recipe.categories.all() for recipe in recipes]]))

            data['recipe_categories'] = RecipeCategorySerializer(recipe_categories, many=True).data

        use_foods = request.query_params.get('foods', False)

        if use_foods:
            foods = set(chain.from_iterable([f for f in [recipe.foods.all() for recipe in recipes]]))

            # Count and modify ingredients...
            ingredients = Ingredient.objects.select_related('food')
            ingredient_counter = Counter(map(lambda i: i.food.id, ingredients))

            for food in foods:
                food.count = ingredient_counter.get(food.id)

            data['foods'] = CountedFoodSerializer(foods, many=True).data

            if use_categories:
                food_categories = set(chain.from_iterable([c for c in [food.categories.all() for food in foods]]))

                data['food_categories'] = FoodCategorySerializer(food_categories, many=True).data

        return Response(status=status.HTTP_200_OK, data=data)

    def retrieve(self, request, pk):
        data = {}

        try:
            recipe = Recipe.objects.prefetch_related('categories', 'foods').get(pk=pk)
        except Recipe.DoesNotExist:
            raise Http404

        data['recipes'] = RecipeSerializer([recipe], many=True).data

        return Response(status=status.HTTP_200_OK, data=data)


class UnitOfMeasureAPIView(views.APIView):
    def get(self, request):
        units_of_measure = UnitOfMeasure.objects.all()

        return Response(status=status.HTTP_200_OK, data={
            'units_of_measure': UnitOfMeasureSerializer(units_of_measure, many=True).data
        })
