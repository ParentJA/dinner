__author__ = 'jason.parent@carneylabs.com (Jason Parent)'

# Third-party imports...
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

# Django imports...
from django.contrib.auth import get_user_model

# Local imports...
from ..models import (
    Food, FoodCategory, FoodCategoryClassification, Ingredient, Pantry, PantryFood, Recipe, RecipeCategory,
    RecipeCategoryClassification, UnitOfMeasure, UserPantry
)
from ..serializers import FoodSerializer, IngredientSerializer, RecipeSerializer, UnitOfMeasureSerializer

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

        # Create unit of measure...
        self.unit_of_measure = UnitOfMeasure.objects.create(description='quantity', abbreviation='qty')

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

    def test_can_create_user_pantries(self):
        with self.assertNumQueries(7):
            response = self.client.post('/api/v1/recipes/pantries/', {
                'name': 'New'
            })

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        user_pantry = UserPantry.objects.get(user=self.user, pantry__name='New')

        self.assertEqual(response.data, {
            'pantries': [{
                'id': self.pantry.id,
                'name': 'Home',
                'foods': [f.id for f in self.pantry.foods.all()]
            }, {
                'id': user_pantry.pantry.id,
                'name': user_pantry.pantry.name,
                'foods': [f.id for f in user_pantry.pantry.foods.all()]
            }]
        })

    def test_can_retrieve_user_pantries(self):
        with self.assertNumQueries(5):
            response = self.client.get('/api/v1/recipes/pantries/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            'pantries': [{
                'id': self.pantry.id,
                'name': self.pantry.name,
                'foods': [f.id for f in self.pantry.foods.all()]
            }]
        })

    def test_new_user_has_pantry(self):
        user_pantries = UserPantry.objects.filter(user=self.user)

        for u in user_pantries:
            u.pantry.delete()
            u.delete()

        with self.assertNumQueries(6):
            response = self.client.get('/api/v1/recipes/pantries/')

        user_pantry = UserPantry.objects.get(user=self.user)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            'pantries': [{
                'id': user_pantry.pantry.id,
                'name': user_pantry.pantry.name,
                'foods': [f.id for f in user_pantry.pantry.foods.all()]
            }]
        })

    def test_can_create_user_pantry_foods(self):
        # Create a new food...
        food = Food.objects.create(name='white onions')

        # Add the food to the pantry...
        with self.assertNumQueries(7):
            response = self.client.post('/api/v1/recipes/pantries/{pantry_id}/foods/{food_id}/'.format(
                pantry_id=self.pantry.id, food_id=food.id
            ), {
                'amount': 1.00,
                'unit_of_measure': self.unit_of_measure.id
            })

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(PantryFood.objects.filter(pantry=self.pantry, food=food).exists())

    def test_can_update_user_pantry_foods(self):
        # Create a new food...
        food = Food.objects.create(name='white onions')
        PantryFood.objects.create(pantry=self.pantry, food=food)

        # Add the food to the pantry...
        with self.assertNumQueries(7):
            response = self.client.put('/api/v1/recipes/pantries/{pantry_id}/foods/{food_id}/'.format(
                pantry_id=self.pantry.id, food_id=food.id
            ), {
                'amount': 2.00,
                'unit_of_measure': self.unit_of_measure.id
            })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(PantryFood.objects.filter(pantry=self.pantry, food=food).exists())

    def test_can_delete_user_pantry_foods(self):
        # Add a new food to the pantry...
        food = Food.objects.create(name='white onions')
        PantryFood.objects.create(pantry=self.pantry, food=food)

        # Delete the food from the pantry...
        with self.assertNumQueries(5):
            response = self.client.delete('/api/v1/recipes/pantries/{pantry_id}/foods/{food_id}/'.format(
                pantry_id=self.pantry.id, food_id=food.id
            ))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(PantryFood.objects.filter(pantry=self.pantry, food=food).exists())


class RecipeViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

        # Set up unit of measure...
        self.unit_of_measure = UnitOfMeasure.objects.create(description='tablespoons', abbreviation='tbsp')

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
        Ingredient.objects.create(
            recipe=self.recipe,
            food=self.food,
            amount=1.000,
            unit_of_measure=self.unit_of_measure,
            description='1 tablespoon of black pepper'
        )

    def test_cannot_retrieve_nonexistent_recipe(self):
        with self.assertNumQueries(1):
            response = self.client.get('/api/v1/recipes/recipes/0/')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_can_retrieve_recipe(self):
        with self.assertNumQueries(2):
            response = self.client.get('/api/v1/recipes/recipes/{}/'.format(self.recipe.pk))

        ingredients = Ingredient.objects.select_related('unit_of_measure').filter(recipe=self.recipe)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            'ingredients': IngredientSerializer(ingredients, many=True).data,
            'recipes': RecipeSerializer([self.recipe], many=True).data,
            'units_of_measure': UnitOfMeasureSerializer([self.unit_of_measure], many=True).data
        })

    def test_can_retrieve_basic_recipe_list(self):
        with self.assertNumQueries(4):
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
        with self.assertNumQueries(4):
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

    def test_can_retrieve_basic_recipe_list_with_foods(self):
        with self.assertNumQueries(5):
            response = self.client.get('/api/v1/recipes/recipes/?foods=true')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            'recipes': [{
                'id': self.recipe.id,
                'name': self.recipe.name,
                'foods': [f.id for f in self.recipe.foods.all()],
                'categories': [c.id for c in self.recipe.categories.all()]
            }],
            'foods': [{
                'id': self.food.id,
                'name': self.food.name,
                'categories': [c.id for c in self.food.categories.all()],
                'count': 1
            }]
        })

    def test_can_retrieve_basic_recipe_list_with_categories_and_foods(self):
        with self.assertNumQueries(5):
            response = self.client.get('/api/v1/recipes/recipes/?categories=true&foods=true')

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
            }],
            'foods': [{
                'id': self.food.id,
                'name': self.food.name,
                'categories': [c.id for c in self.food.categories.all()],
                'count': 1
            }],
            'food_categories': [{
                'id': self.food_category.id,
                'description': self.food_category.description
            }]
        })


class UnitOfMeasureViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

        # Set up units of measure...
        self.unit_of_measure = UnitOfMeasure.objects.create(description='teaspoons', abbreviation='tsp')

    def test_can_retrieve_units_of_measure_list(self):
        with self.assertNumQueries(1):
            response = self.client.get('/api/v1/recipes/units_of_measure/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            'units_of_measure': [{
                'id': self.unit_of_measure.id,
                'description': self.unit_of_measure.description,
                'abbreviation': self.unit_of_measure.abbreviation
            }]
        })
