__author__ = 'jason.parent@carneylabs.com (Jason Parent)'

# Third-party imports...
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

# Django imports...
from django.contrib.auth import get_user_model

# Local imports...
from ..models import (
    Food, FoodCategory, FoodCategoryClassification, Ingredient, Pantry, PantryFood, Recipe, RecipeCategory,
    RecipeCategoryClassification, UserPantry
)

User = get_user_model()


class FoodViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

        # Set up food data...
        self.food = Food.objects.create(name='tomatoes')
        self.food_category = FoodCategory.objects.create(description='vegetable')
        FoodCategoryClassification.objects.create(
            food=self.food, food_category=self.food_category
        )

    def test_can_retrieve_basic_food_list(self):
        with self.assertNumQueries(2):
            response = self.client.get('/api/v1/recipes/foods/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            'foods': [{
                'id': self.food.id,
                'name': self.food.name,
                'categories': [c.id for c in self.food.categories.all()]
            }]
        })

    def test_can_retrieve_basic_food_list_with_categories(self):
        with self.assertNumQueries(2):
            response = self.client.get('/api/v1/recipes/foods/?categories=true')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            'foods': [{
                'id': self.food.id,
                'name': self.food.name,
                'categories': [c.id for c in self.food.categories.all()]
            }],
            'food_categories': [{
                'id': self.food_category.id,
                'description': self.food_category.description
            }]
        })


class PantryViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

        # Set up user data...
        self.user = User.objects.create_user(
            first_name='Jason',
            last_name='Parent',
            email='jason.parent@example.com',
            username='jason.parent@example.com',
            password='password'
        )

        # Set up food data...
        self.food = Food.objects.create(name='tomatoes')
        self.food_category = FoodCategory.objects.create(description='vegetable')
        FoodCategoryClassification.objects.create(
            food=self.food, food_category=self.food_category
        )

        # Set up pantry data...
        self.pantry = Pantry.objects.create(name='Home')
        UserPantry.objects.create(user=self.user, pantry=self.pantry)
        PantryFood.objects.create(pantry=self.pantry, food=self.food)

        # Log in...
        self.client.login(username='jason.parent@example.com', password='password')

    def test_can_retrieve_user_pantries(self):
        with self.assertNumQueries(4):
            response = self.client.get('/api/v1/recipes/pantries/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            'pantries': [{
                'id': self.pantry.id,
                'name': 'Home',
                'foods': [f.id for f in self.pantry.foods.all()]
            }]
        })


class RecipeViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

        # Set up food data...
        self.food = Food.objects.create(name='tomatoes')
        self.food_category = FoodCategory.objects.create(description='vegetable')
        FoodCategoryClassification.objects.create(
            food=self.food, food_category=self.food_category
        )

        # Set up recipe data...
        self.recipe = Recipe.objects.create(
            name='Essential Simmered Tomato-Jalapeno Sauce',
            description='Sample description...',
            instructions='Sample instructions...'
        )
        self.recipe_category = RecipeCategory.objects.create(description='salsa')
        RecipeCategoryClassification.objects.create(
            recipe=self.recipe, recipe_category=self.recipe_category
        )
        Ingredient.objects.create(recipe=self.recipe, food=self.food)

    def test_cannot_retrieve_nonexistent_recipe(self):
        with self.assertNumQueries(1):
            response = self.client.get('/api/v1/recipes/recipes/0/')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_can_retrieve_recipe(self):
        with self.assertNumQueries(3):
            response = self.client.get('/api/v1/recipes/recipes/' + str(self.recipe.pk) + '/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            'recipes': [{
                'id': self.recipe.id,
                'name': self.recipe.name,
                'description': self.recipe.description,
                'instructions': self.recipe.instructions,
                'foods': [f.id for f in self.recipe.foods.all()],
                'categories': [c.id for c in self.recipe.categories.all()]
            }]
        })

    def test_can_retrieve_basic_recipe_list(self):
        with self.assertNumQueries(3):
            response = self.client.get('/api/v1/recipes/recipes/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            'recipes': [{
                'id': self.recipe.id,
                'name': self.recipe.name,
                'foods': [f.id for f in self.recipe.foods.all()],
                'categories': [c.id for c in self.recipe.categories.all()]
            }]
        })

    def test_can_retrieve_basic_recipe_list_with_categories(self):
        with self.assertNumQueries(3):
            response = self.client.get('/api/v1/recipes/recipes/?categories=true')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            'recipes': [{
                'id': self.recipe.id,
                'name': self.recipe.name,
                'foods': [f.id for f in self.recipe.foods.all()],
                'categories': [c.id for c in self.recipe.categories.all()]
            }],
            'recipe_categories': [{
                'id': self.recipe_category.id,
                'description': self.recipe_category.description
            }]
        })
