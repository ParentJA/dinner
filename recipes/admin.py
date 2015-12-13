__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.contrib import admin

# Local imports...
from .models import (
    Food, FoodCategory, Pantry, PriceComponent, Recipe, RecipeCategory, UnitOfMeasure, UserPantry, UserRecipeRecord
)


class IngredientAdmin(admin.TabularInline):
    model = Recipe.foods.through
    fields = ('food', 'description', 'amount', 'unit_of_measure')
    raw_id_fields = ('food', 'unit_of_measure')
    autocomplete_lookup_fields = {
        'fk': ('food', 'unit_of_measure')
    }
    extra = 1


class RecipeCategoryClassificationAdmin(admin.TabularInline):
    model = Recipe.categories.through
    extra = 1


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    change_form_template = 'recipes/admin/change_form.html'
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
    fields = ('food', 'price', 'amount', 'unit_of_measure')


@admin.register(UnitOfMeasure)
class UnitOfMeasureAdmin(admin.ModelAdmin):
    fields = ('description', 'abbreviation')


@admin.register(UserPantry)
class UserPantryAdmin(admin.ModelAdmin):
    fields = ('user', 'pantry')


class PantryFoodAdmin(admin.TabularInline):
    model = Pantry.foods.through
    fields = ('food', 'amount', 'unit_of_measure')
    extra = 1


@admin.register(Pantry)
class PantryAdmin(admin.ModelAdmin):
    fields = ('name',)
    inlines = (PantryFoodAdmin,)


@admin.register(UserRecipeRecord)
class UserRecipeRecordAdmin(admin.ModelAdmin):
    model = UserRecipeRecord
    fields = ('user', 'recipe', 'created', 'updated',)
    readonly_fields = ('user', 'recipe', 'created')
