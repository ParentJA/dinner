__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import status, views
from rest_framework.response import Response

# Local imports...
from .models import Food, FoodCategory, Recipe, RecipeCategory
from .serializers import FoodSerializer, FoodCategorySerializer, RecipeSerializer, RecipeCategorySerializer


class RecipeAPIView(views.APIView):
    def get(self, request):
        foods = Food.objects.all()
        food_categories = FoodCategory.objects.all()
        recipes = Recipe.objects.all()
        recipe_categories = RecipeCategory.objects.all()

        return Response(status=status.HTTP_200_OK, data={
            'foods': FoodSerializer(foods, many=True).data,
            'food_categories': FoodCategorySerializer(food_categories, many=True).data,
            'recipes': RecipeSerializer(recipes, many=True).data,
            'recipe_categories': RecipeCategorySerializer(recipe_categories, many=True).data
        })
