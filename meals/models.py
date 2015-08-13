__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.db import models


class Dish(models.Model):
    name = models.CharField(max_length=250)

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
