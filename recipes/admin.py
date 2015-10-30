__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.contrib import admin

# Local imports...
from .models import (
    Food, FoodCategory, Pantry, PriceComponent, Recipe, RecipeCategory, UnitOfMeasure, UserPantry
)


class IngredientAdmin(admin.TabularInline):
    model = Recipe.foods.through
    fields = ('description', 'amount', 'unit_of_measure')
    extra = 1


class RecipeCategoryClassificationAdmin(admin.TabularInline):
    model = Recipe.categories.through
    extra = 1


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    fields = ('name', 'description', 'instructions')
    inlines = (IngredientAdmin, RecipeCategoryClassificationAdmin)


@admin.register(RecipeCategory)
class RecipeCategoryAdmin(admin.ModelAdmin):
    fields = ('description',)


class FoodCategoryClassificationAdmin(admin.TabularInline):
    model = Food.categories.through
    extra = 1


@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    fields = ('name',)
    inlines = (FoodCategoryClassificationAdmin,)


@admin.register(FoodCategory)
class FoodCategoryAdmin(admin.ModelAdmin):
    fields = ('description',)


@admin.register(PriceComponent)
class PriceComponentAdmin(admin.ModelAdmin):
    fields = ('food', 'price', 'unit_of_measure')


@admin.register(UnitOfMeasure)
class UnitOfMeasureAdmin(admin.ModelAdmin):
    fields = ('description', 'abbreviation')


@admin.register(UserPantry)
class UserPantryAdmin(admin.ModelAdmin):
    pass


class PantryFoodAdmin(admin.TabularInline):
    model = Pantry.foods.through
    fields = ('food', 'unit_of_measure')
    extra = 1


@admin.register(Pantry)
class PantryAdmin(admin.ModelAdmin):
    fields = ('name',)
    inlines = (PantryFoodAdmin,)
