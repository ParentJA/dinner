__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Standard library imports...
import collections

# Third-party imports...
from rest_framework import status, views
from rest_framework.response import Response

# Local imports...
from .models import Pantry, PantryIngredient
from .serializers import PantrySerializer
from meals.models import Ingredient
from meals.serializers import IngredientSerializer


class PantryAPIView(views.APIView):
    def get(self, request):
        # Pantries...
        pantries = Pantry.objects.all()

        # Ingredients...
        ingredients = Ingredient.objects.all()

        # Count and modify ingredients...
        pantry_ingredients = PantryIngredient.objects.select_related('ingredient')
        ingredient_counter = collections.Counter(map(lambda di: di.ingredient.id, pantry_ingredients))

        for ingredient in ingredients:
            ingredient.count = ingredient_counter.get(ingredient.id)

        return Response(status=status.HTTP_200_OK, data={
            'pantries': PantrySerializer(pantries, many=True).data,
            'ingredients': IngredientSerializer(ingredients, many=True).data
        })
