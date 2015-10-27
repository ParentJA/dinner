__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.conf import settings
from django.db import models

AUTH_USER_MODEL = getattr(settings, 'AUTH_USER_MODEL')


class Pantry(models.Model):
    """A user can have more than one named pantry."""
    name = models.CharField(max_length=255)
    user = models.ForeignKey(AUTH_USER_MODEL, related_name='pantries')
    ingredients = models.ManyToManyField(
        'meals.Ingredient',
        through='pantries.PantryIngredient',
        through_fields=('pantry', 'ingredient')
    )

    class Meta:
        verbose_name_plural = 'pantries'

    def __unicode__(self):
        return self.name


class PantryIngredient(models.Model):
    pantry = models.ForeignKey('pantries.Pantry')
    ingredient = models.ForeignKey('meals.Ingredient')

    class Meta:
        unique_together = ('pantry', 'ingredient')

    def __unicode__(self):
        return '{}: {}'.format(self.pantry, self.ingredient)
