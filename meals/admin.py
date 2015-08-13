__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.contrib import admin

# Local imports...
from .models import Dish, DishIngredient, Ingredient


@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    ordering = ('name',)


@admin.register(DishIngredient)
class DishIngredientAdmin(admin.ModelAdmin):
    pass


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    ordering = ('name',)
