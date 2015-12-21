from __future__ import division

__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Standard library imports...
from decimal import Decimal, ROUND_UP
import json
import os
import sys

# Django imports...
from django.db.models import Q

# Local imports...
from ..models import Food, Ingredient, Recipe, UnitOfMeasure

FOODS = [(food.name, food) for food in Food.objects.all()]

DEFAULT_FOOD = Food.objects.first()


def format_number(value):
    return Decimal(value).quantize(Decimal('.001'), rounding=ROUND_UP)


def get_value(amount):
    if amount is None:
        return format_number(0)

    # Try to convert amount to an integer...
    try:
        value = int(amount)
        return format_number(value)
    except ValueError:
        print 'Could not convert %s to an integer...' % amount

    # Try to get the greatest value if amount is a range...
    if '-' in amount:
        try:
            value = eval(amount.split('-')[-1])
            return format_number(value)
        except SyntaxError:
            print 'Could not process %s as a range...' % amount
    else:
        print '%s is not a range...' % amount

    # Try to evaluate a fraction...
    if '/' in amount:
        try:
            value = eval(amount)
            return format_number(value)
        except SyntaxError:
            print 'Could not process %s as a fraction...' % amount
    else:
        print '%s is not a fraction...' % amount

    return format_number(0)


def get_unit(unit):
    if unit is None:
        return None

    try:
        query = Q(description__icontains=unit) | Q(abbreviation__icontains=unit)
        return UnitOfMeasure.objects.get(query)
    except UnitOfMeasure.DoesNotExist:
        return None


def create_ingredients(json_list, recipe):
    # TODO: Prompt to remove all ingredients from recipe...
    for ingredient_dict in json_list:
        # Handle description...
        ingredient_description = ingredient_dict.get('description')

        # Handle amount...
        amount = ingredient_dict.get('amount')
        amount = get_value(amount)

        # Handle unit of measure...
        unit_of_measure = ingredient_dict.get('unit_of_measure')
        unit_of_measure = get_unit(unit_of_measure)

        # If no unit of measure was found and there is an integer amount, it's likely a quantity...
        if unit_of_measure is None and isinstance(amount, int):
            unit_of_measure = UnitOfMeasure.objects.get(description='quantity')

        # Attempt to find food...
        ingredient_food = DEFAULT_FOOD

        for food_name, food_object in FOODS:
            if food_name in ingredient_description:
                ingredient_food = food_object
                break

        Ingredient.objects.create(
            recipe=recipe,
            food=ingredient_food,
            description=ingredient_description,
            amount=amount,
            unit_of_measure=unit_of_measure
        )


def create_recipes(json_list):
    for recipe_dict in json_list:
        recipe_name = recipe_dict.get('name')
        recipe_description = recipe_dict.get('description')
        recipe_instructions = recipe_dict.get('instructions')

        print 'Creating %s' % recipe_name

        recipe, created = Recipe.objects.get_or_create(
            name=recipe_name,
            description=recipe_description,
            instructions=recipe_instructions
        )

        recipe_ingredients = recipe_dict.get('ingredients')

        create_ingredients(recipe_ingredients, recipe)


def create_recipes_from_file(file_path):
    with open(file_path, 'rt') as file_name:
        file_json = json.loads(file_name.read())

    create_recipes(file_json)


def main():
    file_path = os.path.join(os.getcwd(), 'recipes001-010.json')

    create_recipes_from_file(file_path)

    return 0


if __name__ == '__main__':
    status = main()
    sys.exit(status)
