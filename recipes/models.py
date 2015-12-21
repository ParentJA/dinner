__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Standard library imports...
from decimal import Decimal

# Django imports...
from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.template.defaulttags import date

AUTH_USER_MODEL = getattr(settings, 'AUTH_USER_MODEL')


def validate_rating(value):
    if value < Decimal(1.0) or value > Decimal(5.0):
        raise ValidationError('Value must be between 1.0 and 5.0')

    fractional_part = int('{:.1f}'.format(value).split('.')[1])

    if fractional_part not in (0, 5):
        raise ValidationError('Value must be a multiple of 0.5')


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

    @staticmethod
    def autocomplete_search_fields():
        return ['name__icontains']

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

    @staticmethod
    def autocomplete_search_fields():
        return ['name__icontains']

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
    recipe = models.ForeignKey('recipes.Recipe', related_name='ingredients')
    food = models.ForeignKey('recipes.Food', related_name='ingredients')

    # It is possible to have no unit of measure and no amount (e.g. salt, black pepper).
    amount = models.DecimalField(
        help_text='ex. 0.500 (one half), 0.250 (one fourth), 0.125 (one eighth)',
        max_digits=6,
        decimal_places=3,
        null=True,
        blank=True
    )
    unit_of_measure = models.ForeignKey('recipes.UnitOfMeasure', null=True, blank=True)

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
    price = models.DecimalField(help_text='ex. 1.25 ($1.25)', max_digits=6, decimal_places=2)

    # It is possible to have no unit of measure and no amount (e.g. salt, black pepper).
    amount = models.DecimalField(
        help_text='ex. 0.500 (one half), 0.250 (one fourth), 0.125 (one eighth)',
        max_digits=6,
        decimal_places=3,
        null=True,
        blank=True
    )
    unit_of_measure = models.ForeignKey('recipes.UnitOfMeasure', null=True, blank=True)

    class Meta:
        default_related_name = 'price_components'
        ordering = ['food']

    def __unicode__(self):
        return '${price} for {amount} {measurement} of {food}'.format(
            price=self.price,
            amount=self.amount,
            measurement=self.unit_of_measure.description,
            food=self.food.name
        )


class UnitOfMeasure(models.Model):
    """
    A unit of measure.
    """
    description = models.CharField(max_length=255)
    abbreviation = models.CharField(max_length=10, null=True, blank=True)

    @staticmethod
    def autocomplete_search_fields():
        return ['description__icontains']

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
    amount = models.DecimalField(
        help_text='ex. 0.500 (one half), 0.250 (one fourth), 0.125 (one eighth)',
        max_digits=6,
        decimal_places=3,
        null=True,
        blank=True
    )
    unit_of_measure = models.ForeignKey('recipes.UnitOfMeasure', null=True, blank=True)

    class Meta:
        unique_together = ('pantry', 'food')


class UserRecipeRecord(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL)
    recipe = models.ForeignKey('recipes.Recipe')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(null=True, blank=True, default=None)

    class Meta:
        default_related_name = 'user_recipe_records'
        verbose_name = 'user recipe record'
        verbose_name_plural = 'user recipe records'

    def __unicode__(self):
        return '{user} made {recipe}: {created} to {updated}'.format(
            user=self.user,
            recipe=self.recipe,
            created=date(self.created, 'DATETIME_FORMAT'),
            updated=date(self.updated, 'DATETIME_FORMAT')
        )


class UserRating(models.Model):
    """A rating that a user has given to a recipe on a scale of 1 to 5."""
    user = models.ForeignKey(AUTH_USER_MODEL)
    recipe = models.ForeignKey('recipes.Recipe')
    rating = models.DecimalField(
        help_text='A number between 1.0 and 5.0 (increments of 0.5)',
        max_digits=2,
        decimal_places=1,
        validators=[validate_rating]
    )

    class Meta:
        default_related_name = 'user_ratings'
        verbose_name = 'user rating'
        verbose_name_plural = 'user ratings'

    def __unicode__(self):
        return '{user} rated {recipe} a {rating}'.format(
            user=self.user,
            recipe=self.recipe,
            rating=self.rating
        )


class UserFavorite(models.Model):
    """A recipe that a user has marked as a favorite."""
    user = models.ForeignKey(AUTH_USER_MODEL)
    recipe = models.ForeignKey('recipes.Recipe')
