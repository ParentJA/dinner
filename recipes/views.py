__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import status, views
from rest_framework.response import Response

# Local imports...
from .models import Measurement, Recipe, RecipeIngredient, Unit, UnitSystem, UnitType
from .serializers import (
    MeasurementSerializer, RecipeSerializer, RecipeIngredientSerializer, UnitSerializer, UnitSystemSerializer,
    UnitTypeSerializer
)


class RecipeAPIView(views.APIView):
    def get(self, request):
        # Recipes...
        recipes = Recipe.objects.all()

        return Response(status=status.HTTP_200_OK, data={
            'recipes': RecipeSerializer(recipes, many=True).data,
        })
