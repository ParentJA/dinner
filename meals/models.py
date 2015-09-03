__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.db import models


class Dish(models.Model):
    name = models.CharField(max_length=250)
    ingredients = models.ManyToManyField(
        'meals.Ingredient',
        through='meals.DishIngredient',
        through_fields=('dish', 'ingredient')
    )
    source = models.ForeignKey('meals.Source', related_name='dishes', blank=True, null=True)
    cuisine = models.ForeignKey('meals.Cuisine', related_name='dishes', blank=True, null=True)

    class Meta:
        verbose_name_plural = 'dishes'

    def __unicode__(self):
        return self.name


class Ingredient(models.Model):
    name = models.CharField(max_length=250, unique=True)

    def __unicode__(self):
        return self.name


class DishIngredient(models.Model):
    dish = models.ForeignKey('meals.Dish', related_name='dish_ingredients')
    ingredient = models.ForeignKey('meals.Ingredient', related_name='dish_ingredients')

    class Meta:
        unique_together = ('dish', 'ingredient')

    def __unicode__(self):
        return '{}: {}'.format(self.dish, self.ingredient)


class Source(models.Model):
    title = models.CharField(max_length=250, unique=True)

    def __unicode__(self):
        return self.title


class Cuisine(models.Model):
    name = models.CharField(max_length=250, unique=True)

    def __unicode__(self):
        return self.name
