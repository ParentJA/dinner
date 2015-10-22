__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.db import models


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    ingredients = models.ManyToManyField(
        'meals.Ingredient',
        through='recipes.RecipeIngredient',
        through_fields=('recipe', 'ingredient')
    )

    def __unicode__(self):
        return self.name


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey('recipes.Recipe', related_name='recipe_ingredients')
    ingredient = models.ForeignKey('meals.Ingredient', related_name='recipe_ingredients')
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=6, decimal_places=4)
    measurement = models.ForeignKey('recipes.Measurement', related_name='recipe_ingredients')

    def __unicode__(self):
        return self.description


class Measurement(models.Model):
    unit = models.ForeignKey('recipes.Unit', related_name='measurements')
    unit_type = models.ForeignKey('recipes.UnitType', related_name='measurements')
    unit_system = models.ForeignKey('recipes.UnitSystem', related_name='measurements')


class Unit(models.Model):
    description = models.CharField(max_length=255)

    def __unicode__(self):
        return self.description


class UnitType(models.Model):
    description = models.CharField(max_length=255)

    def __unicode__(self):
        return self.description


class UnitSystem(models.Model):
    description = models.CharField(max_length=255)

    def __unicode__(self):
        return self.description
