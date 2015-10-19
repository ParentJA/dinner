__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import status, views
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

# Local imports...
from .models import Pantry, PantryIngredient
from .serializers import PantrySerializer
from meals.models import Ingredient
from meals.serializers import IngredientSerializer


class PantryAPIView(views.APIView):
    def get(self, request):
        # Pantries...
        pantries = Pantry.objects.filter(user=request.user)

        if pantries.exists():
            pantry = pantries.first()
            pantries = list(pantries)

        else:
            # Create a pantry if it does not exist...
            user = request.user
            name = '{}\'s Pantry'.format(user.first_name)
            pantry = Pantry.objects.create(name=name, user=user)
            pantries = [pantry]

        # Ingredients...
        pantry_ingredients = PantryIngredient.objects.select_related('pantry', 'ingredient').filter(pantry=pantry)
        ingredients = [pantry_ingredient.ingredient for pantry_ingredient in pantry_ingredients]

        return Response(status=status.HTTP_200_OK, data={
            'pantries': PantrySerializer(pantries, many=True).data,
            'ingredients': IngredientSerializer(ingredients, many=True).data
        })


class PantryIngredientAPIView(views.APIView):
    def post(self, request, ingredient_id):
        # Retrieve pantry...
        pantry = get_object_or_404(Pantry, user=request.user)

        # Retrieve ingredient...
        ingredient = get_object_or_404(Ingredient, pk=ingredient_id)

        # Find ingredient...
        pantry_ingredient = PantryIngredient.objects.select_related('pantry', 'ingredient')
        pantry_ingredient = pantry_ingredient.filter(pantry=pantry, ingredient__id=ingredient_id)

        if pantry_ingredient.exists():
            return Response(status=status.HTTP_400_BAD_REQUEST, data={
                'message': 'The specified ingredient is already in your pantry.'
            })

        # Create the pantry ingredient if it does not exist...
        PantryIngredient.objects.create(pantry=pantry, ingredient=ingredient)

        return Response(status=status.HTTP_200_OK)

    def delete(self, request, ingredient_id):
        # Retrieve pantry...
        pantry = get_object_or_404(Pantry, user=request.user)

        # Retrieve ingredient...
        ingredient = get_object_or_404(Ingredient, pk=ingredient_id)

        # Find ingredient...
        pantry_ingredient = get_object_or_404(PantryIngredient, pantry=pantry, ingredient=ingredient)
        pantry_ingredient.delete()

        return Response(status=status.HTTP_200_OK)
