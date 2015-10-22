__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.contrib import admin

# Local imports...
from .models import Measurement, Recipe, Unit, UnitSystem, UnitType


@admin.register(Measurement)
class MeasurementAdmin(admin.ModelAdmin):
    fields = ('unit', 'unit_type', 'unit_system')
    ordering = ('unit',)


class RecipeIngredientAdmin(admin.TabularInline):
    model = Recipe.ingredients.through
    extra = 1


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    fields = ('name',)
    ordering = ('name',)
    inlines = (RecipeIngredientAdmin,)


@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    fields = ('description',)
    ordering = ('description',)


@admin.register(UnitSystem)
class UnitSystemAdmin(admin.ModelAdmin):
    fields = ('description',)
    ordering = ('description',)


@admin.register(UnitType)
class UnitTypeAdmin(admin.ModelAdmin):
    fields = ('description',)
    ordering = ('description',)
