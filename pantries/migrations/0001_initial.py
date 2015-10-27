# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0006_ingredient_tags'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Pantry',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name_plural': 'pantries',
            },
        ),
        migrations.CreateModel(
            name='PantryIngredient',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('ingredient', models.ForeignKey(to='meals.Ingredient')),
                ('pantry', models.ForeignKey(to='pantries.Pantry')),
            ],
        ),
        migrations.AddField(
            model_name='pantry',
            name='ingredients',
            field=models.ManyToManyField(to='meals.Ingredient', through='pantries.PantryIngredient'),
        ),
        migrations.AddField(
            model_name='pantry',
            name='user',
            field=models.ForeignKey(related_name='pantries', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='pantryingredient',
            unique_together=set([('pantry', 'ingredient')]),
        ),
    ]
