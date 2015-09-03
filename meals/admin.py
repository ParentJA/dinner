__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.contrib import admin

# Local imports...
from .models import Cuisine, Dish, DishIngredient, Ingredient, Source


class DishIngredientAdmin(admin.TabularInline):
    model = Dish.ingredients.through


@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    fields = ('name',)
    ordering = ('name',)
    inlines = (DishIngredientAdmin,)


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    fields = ('name',)
    ordering = ('name',)


@admin.register(Cuisine)
class CuisineAdmin(admin.ModelAdmin):
    fields = ('name',)
    ordering = ('name',)


@admin.register(Source)
class SourceAdmin(admin.ModelAdmin):
    fields = ('title',)
    ordering = ('title',)
