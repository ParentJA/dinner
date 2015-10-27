__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.contrib import admin

# Local imports...
from .models import Pantry


class PantryIngredientAdmin(admin.TabularInline):
    model = Pantry.ingredients.through
    extra = 1


@admin.register(Pantry)
class PantryAdmin(admin.ModelAdmin):
    fields = ('name', 'user')
    ordering = ('name', 'user')
    inlines = (PantryIngredientAdmin,)
