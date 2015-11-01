__author__ = 'jason.parent@carneylabs.com (Jason Parent)'

# Third-party imports...
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

# Django imports...
from django.contrib.auth import get_user_model

# Local imports...
from ..models import (
    Food, FoodCategory, FoodCategoryClassification, Recipe, RecipeCategory, RecipeCategoryClassification
)

User = get_user_model()


class RecipeViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_can_retrieve_recipe_list(self):
        food = Food.objects.create(name='tomatoes')
        food_category = FoodCategory.objects.create(description='vegetable')
        FoodCategoryClassification.objects.create(
            food=food, food_category=food_category
        )
        recipe = Recipe.objects.create(name='Essential Simmered Tomato-Jalapeno Sauce')
        recipe_category = RecipeCategory.objects.create(description='salsa')
        RecipeCategoryClassification.objects.create(
            recipe=recipe, recipe_category=recipe_category
        )

        response = self.client.get('/api/v1/recipes/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            'foods': [{
                'id': food.id,
                'name': food.name,
                'categories': [c.id for c in recipe.categories.all()]
            }],
            'food_categories': [{
                'id': food_category.id,
                'description': food_category.description
            }],
            'recipes': [{
                'id': recipe.id,
                'name': recipe.name,
                'foods': [f.id for f in recipe.foods.all()],
                'categories': [c.id for c in recipe.categories.all()]
            }],
            'recipe_categories': [{
                'id': recipe_category.id,
                'description': recipe_category.description
            }]
        })

        self.assertNumQueries(4)
