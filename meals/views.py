__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

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

        return Response(status=status.HTTP_200_OK, data={
            'dishes': DishSerializer(dishes, many=True).data,
            # 'ingredients': IngredientSerializer(ingredients, many=True).data
        })
