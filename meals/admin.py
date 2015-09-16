__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.contrib import admin

# Local imports...
from .models import Cuisine, Dish, DishIngredient, Ingredient, Source, Tag


class DishIngredientAdmin(admin.TabularInline):
    model = Dish.ingredients.through
    extra = 1


class IngredientTagAdmin(admin.TabularInline):
    model = Ingredient.tags.through
    extra = 1


@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    fields = ('name',)
    ordering = ('name',)
    inlines = (DishIngredientAdmin,)


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    fields = ('name',)
    ordering = ('name',)
    inlines = (IngredientTagAdmin,)


@admin.register(Cuisine)
class CuisineAdmin(admin.ModelAdmin):
    fields = ('name',)
    ordering = ('name',)


@admin.register(Source)
class SourceAdmin(admin.ModelAdmin):
    fields = ('title',)
    ordering = ('title',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    fields = ('name',)
    ordering = ('name',)
