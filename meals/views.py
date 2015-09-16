__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Standard library imports...
import collections

# Third-party imports...
from rest_framework import status, views
from rest_framework.response import Response

# Local imports...
from .models import Cuisine, Dish, DishIngredient, Ingredient, Source, Tag
from .serializers import CuisineSerializer, DishSerializer, IngredientSerializer, SourceSerializer, TagSerializer


class DishAPIView(views.APIView):
    def get(self, request):
        # Dishes...
        dishes = Dish.objects.all()

        # Ingredients...
        ingredients = Ingredient.objects.all()

        # Count and modify ingredients...
        dish_ingredients = DishIngredient.objects.select_related('ingredient')
        ingredient_counter = collections.Counter(map(lambda di: di.ingredient.id, dish_ingredients))

        for ingredient in ingredients:
            ingredient.count = ingredient_counter.get(ingredient.id)

        # Cuisines...
        cuisines = Cuisine.objects.all()

        # Sources...
        sources = Source.objects.all()

        # Tags...
        tags = Tag.objects.all()

        return Response(status=status.HTTP_200_OK, data={
            'dishes': DishSerializer(dishes, many=True).data,
            'ingredients': IngredientSerializer(ingredients, many=True).data,
            'cuisines': CuisineSerializer(cuisines, many=True).data,
            'sources': SourceSerializer(sources, many=True).data,
            'tags': TagSerializer(tags, many=True).data
        })
