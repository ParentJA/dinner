__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.conf import settings
from django.db import models

AUTH_USER_MODEL = getattr(settings, 'AUTH_USER_MODEL')


class Recipe(models.Model):
    """
    A food preparation.
    """
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    instructions = models.TextField(null=True, blank=True)
    foods = models.ManyToManyField(
        'recipes.Food',
        through='recipes.Ingredient',
        through_fields=('recipe', 'food'),
    )
    categories = models.ManyToManyField(
        'recipes.RecipeCategory',
        through='recipes.RecipeCategoryClassification',
        through_fields=('recipe', 'recipe_category')
    )

    class Meta:
        default_related_name = 'recipes'
        ordering = ['name']

    def __unicode__(self):
        return self.name


class RecipeCategory(models.Model):
    """
    A category that describes a recipe (e.g. Mexican, entree, taco).
    """
    description = models.CharField(max_length=255)

    class Meta:
        default_related_name = 'recipe_categories'
        verbose_name = 'recipe category'
        verbose_name_plural = 'recipe categories'

    def __unicode__(self):
        return self.description


class RecipeCategoryClassification(models.Model):
    recipe = models.ForeignKey('recipes.Recipe')
    recipe_category = models.ForeignKey('recipes.RecipeCategory')


class Food(models.Model):
    """
    An edible grocery item.
    """
    name = models.CharField(max_length=255, unique=True)
    categories = models.ManyToManyField(
        'recipes.FoodCategory',
        through='recipes.FoodCategoryClassification',
        through_fields=('food', 'food_category')
    )

    class Meta:
        default_related_name = 'foods'
        ordering = ['name']

    def __unicode__(self):
        return self.name


class FoodCategory(models.Model):
    """
    A category that describes a food (e.g. produce, vegetable).
    """
    description = models.CharField(max_length=255)

    class Meta:
        default_related_name = 'food_categories'
        verbose_name = 'food category'
        verbose_name_plural = 'food categories'

    def __unicode__(self):
        return self.description


class FoodCategoryClassification(models.Model):
    food = models.ForeignKey('recipes.Food')
    food_category = models.ForeignKey('recipes.FoodCategory')


class Ingredient(models.Model):
    """
    A food that is used in a recipe.
    """
    recipe = models.ForeignKey('recipes.Recipe')
    food = models.ForeignKey('recipes.Food')

    # It is possible to have no unit of measure and no amount (e.g. salt, black pepper).
    unit_of_measure = models.ForeignKey('recipes.UnitOfMeasure', null=True, blank=True)
    amount = models.DecimalField(
        help_text='ex. 0.500 (one half), 0.250 (one fourth), 0.125 (one eighth)',
        max_digits=6,
        decimal_places=3,
        null=True,
        blank=True
    )

    description = models.CharField(help_text='ex. 2 cloves of garlic, minced', max_length=255)

    class Meta:
        default_related_name = 'ingredients'
        ordering = ['recipe']

    def __unicode__(self):
        return self.description


class PriceComponent(models.Model):
    """
    A component that describes the price of an item with several factors (e.g. geographic location, unit of measure).
    """
    food = models.ForeignKey('recipes.Food')
    unit_of_measure = models.ForeignKey('recipes.UnitOfMeasure')
    price = models.DecimalField(help_text='ex. 1.25 ($1.25)', max_digits=6, decimal_places=2)

    class Meta:
        default_related_name = 'price_components'
        ordering = ['food']

    def __unicode__(self):
        return '{price} for {measurement} of {food}'.format(
            price=self.price,
            measurement=self.unit_of_measure.description,
            food=self.food.name
        )


class UnitOfMeasure(models.Model):
    """
    A unit of measure.
    """
    description = models.CharField(max_length=255)
    abbreviation = models.CharField(max_length=10, null=True, blank=True)

    class Meta:
        default_related_name = 'units_of_measure'
        ordering = ['description']
        verbose_name = 'unit of measure'
        verbose_name_plural = 'units of measure'

    def __unicode__(self):
        return '{description} ({abbreviation})'.format(description=self.description, abbreviation=self.abbreviation)


class UserPantry(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL)
    pantry = models.ForeignKey('recipes.Pantry')

    class Meta:
        default_related_name = 'user_pantries'
        verbose_name = 'user pantry'
        verbose_name_plural = 'user pantries'

    def __unicode__(self):
        '{user}\'s {pantry}'.format(user=self.user, pantry=self.pantry)


class Pantry(models.Model):
    """
    An inventory of food.
    """
    name = models.CharField('ex. Home', max_length=255, default='Home')
    foods = models.ManyToManyField(
        'recipes.Food',
        through='recipes.PantryFood',
        through_fields=('pantry', 'food')
    )

    class Meta:
        default_related_name = 'pantries'
        verbose_name = 'pantry'
        verbose_name_plural = 'pantries'

    def __unicode__(self):
        return self.name


class PantryFood(models.Model):
    pantry = models.ForeignKey('recipes.Pantry')
    food = models.ForeignKey('recipes.Food')

    # It is possible to have no unit of measure and no amount (e.g. salt, black pepper).
    unit_of_measure = models.ForeignKey('recipes.UnitOfMeasure', null=True, blank=True)
    amount = models.DecimalField(
        help_text='ex. 0.500 (one half), 0.250 (one fourth), 0.125 (one eighth)',
        max_digits=6,
        decimal_places=3,
        null=True,
        blank=True
    )
