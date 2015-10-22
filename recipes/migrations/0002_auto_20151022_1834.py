# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0006_ingredient_tags'),
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='measurement',
            name='unit',
            field=models.ForeignKey(related_name='measurements', default=None, to='recipes.Unit'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='measurement',
            name='unit_system',
            field=models.ForeignKey(related_name='measurements', default=None, to='recipes.UnitSystem'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='measurement',
            name='unit_type',
            field=models.ForeignKey(related_name='measurements', default=None, to='recipes.UnitType'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='recipe',
            name='ingredients',
            field=models.ManyToManyField(to='meals.Ingredient', through='recipes.RecipeIngredient'),
        ),
        migrations.AddField(
            model_name='recipe',
            name='name',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='recipeingredient',
            name='amount',
            field=models.DecimalField(default=0.0, max_digits=6, decimal_places=4),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='recipeingredient',
            name='description',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='recipeingredient',
            name='ingredient',
            field=models.ForeignKey(related_name='recipe_ingredients', default='', to='meals.Ingredient'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='recipeingredient',
            name='measurement',
            field=models.ForeignKey(related_name='recipe_ingredients', default=None, to='recipes.Measurement'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='recipeingredient',
            name='recipe',
            field=models.ForeignKey(related_name='recipe_ingredients', default=None, to='recipes.Recipe'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='unit',
            name='description',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='unitsystem',
            name='description',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='unittype',
            name='description',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]
