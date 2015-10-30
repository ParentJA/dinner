# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'ordering': ['name'],
                'default_related_name': 'foods',
            },
        ),
        migrations.CreateModel(
            name='FoodCategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': 'food category',
                'verbose_name_plural': 'food categories',
                'default_related_name': 'food_categories',
            },
        ),
        migrations.CreateModel(
            name='FoodCategoryClassification',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('food', models.ForeignKey(to='recipes.Food')),
                ('food_category', models.ForeignKey(to='recipes.FoodCategory')),
            ],
        ),
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('amount', models.DecimalField(null=True, verbose_name=b'ex. 0.500 (one half), 0.250 (one fourth), 0.125 (one eighth)', max_digits=6, decimal_places=3, blank=True)),
                ('description', models.CharField(max_length=255, verbose_name=b'ex. 2 cloves of garlic, minced')),
                ('food', models.ForeignKey(to='recipes.Food')),
            ],
            options={
                'ordering': ['recipe'],
                'default_related_name': 'ingredients',
            },
        ),
        migrations.CreateModel(
            name='Pantry',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(default=b'Home', max_length=255, verbose_name=b'ex. Home')),
            ],
            options={
                'verbose_name': 'pantry',
                'verbose_name_plural': 'pantries',
                'default_related_name': 'pantries',
            },
        ),
        migrations.CreateModel(
            name='PantryFood',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('food', models.ForeignKey(to='recipes.Food')),
                ('pantry', models.ForeignKey(to='recipes.Pantry')),
            ],
        ),
        migrations.CreateModel(
            name='PriceComponent',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('price', models.DecimalField(verbose_name=b'ex. 1.25 ($1.25)', max_digits=6, decimal_places=2)),
                ('food', models.ForeignKey(to='recipes.Food')),
            ],
            options={
                'ordering': ['food'],
                'default_related_name': 'price_components',
            },
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(null=True, blank=True)),
                ('instructions', models.TextField(null=True, blank=True)),
            ],
            options={
                'ordering': ['name'],
                'default_related_name': 'recipes',
            },
        ),
        migrations.CreateModel(
            name='RecipeCategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': 'recipe category',
                'verbose_name_plural': 'recipe categories',
                'default_related_name': 'recipe_categories',
            },
        ),
        migrations.CreateModel(
            name='RecipeCategoryClassification',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('recipe', models.ForeignKey(to='recipes.Recipe')),
                ('recipe_category', models.ForeignKey(to='recipes.RecipeCategory')),
            ],
        ),
        migrations.CreateModel(
            name='UnitOfMeasure',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.CharField(max_length=255)),
                ('abbreviation', models.CharField(max_length=10, null=True, blank=True)),
            ],
            options={
                'ordering': ['description'],
                'verbose_name': 'unit of measure',
                'verbose_name_plural': 'units of measure',
                'default_related_name': 'units_of_measure',
            },
        ),
        migrations.CreateModel(
            name='UserPantry',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('pantry', models.ForeignKey(to='recipes.Pantry')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='recipe',
            name='categories',
            field=models.ManyToManyField(to='recipes.RecipeCategory', through='recipes.RecipeCategoryClassification'),
        ),
        migrations.AddField(
            model_name='recipe',
            name='foods',
            field=models.ManyToManyField(to='recipes.Food', through='recipes.Ingredient'),
        ),
        migrations.AddField(
            model_name='pricecomponent',
            name='unit_of_measure',
            field=models.ForeignKey(to='recipes.UnitOfMeasure'),
        ),
        migrations.AddField(
            model_name='pantryfood',
            name='unit_of_measure',
            field=models.ForeignKey(to='recipes.UnitOfMeasure'),
        ),
        migrations.AddField(
            model_name='pantry',
            name='foods',
            field=models.ManyToManyField(to='recipes.Food', through='recipes.PantryFood'),
        ),
        migrations.AddField(
            model_name='ingredient',
            name='recipe',
            field=models.ForeignKey(to='recipes.Recipe'),
        ),
        migrations.AddField(
            model_name='ingredient',
            name='unit_of_measure',
            field=models.ForeignKey(blank=True, to='recipes.UnitOfMeasure', null=True),
        ),
        migrations.AddField(
            model_name='food',
            name='categories',
            field=models.ManyToManyField(to='recipes.FoodCategory', through='recipes.FoodCategoryClassification'),
        ),
    ]
