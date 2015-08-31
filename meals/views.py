__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Standard library imports...
import collections

# Third-party imports...
from rest_framework import status, views
from rest_framework.response import Response

# Local imports...
from .models import Dish, DishIngredient, Ingredient
from .serializers import DishSerializer, IngredientSerializer


class DishAPIView(views.APIView):
    def get(self, request, pk=None):
        dishes = Dish.objects.select_related()

        if pk:
            dishes = dishes.filter(pk=pk)

        ingredients = set()

        for dish in dishes:
            dish_ingredients = set()
            dish_ingredient_ids = set()

            for dish_ingredient in dish.dish_ingredients.all():
                dish_ingredients.add(dish_ingredient.ingredient)
                dish_ingredient_ids.add(dish_ingredient.ingredient.id)

            # Update the total list of ingredients...
            ingredients.update(dish_ingredients)

            # Assign the list of ingredient IDs to the dish...
            dish.ingredient_ids = dish_ingredient_ids

        return Response(status=status.HTTP_200_OK, data={
            'dishes': DishSerializer(dishes, many=True).data,
            'ingredients': IngredientSerializer(ingredients, many=True).data
        })


class IngredientAPIView(views.APIView):
    def get(self, request, pk=None):
        if request.query_params.get('count'):
            dish_ingredients = DishIngredient.objects.select_related('ingredient')
            ingredient_count = collections.defaultdict(int)

            for dish_ingredient in dish_ingredients:
                ingredient_count[dish_ingredient.ingredient] += 1

            ingredients = []

            for ingredient, count in ingredient_count.iteritems():
                ingredient.count = count
                ingredients.append(ingredient)

        else:
            ingredients = Ingredient.objects.all()

        if pk:
            ingredients = ingredients.filter(pk=pk)

        return Response(status=status.HTTP_200_OK, data={
            'ingredients': IngredientSerializer(ingredients, many=True).data
        })
