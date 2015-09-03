# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0002_auto_20150813_2028'),
    ]

    operations = [
        migrations.AddField(
            model_name='dish',
            name='ingredients',
            field=models.ManyToManyField(to='meals.Ingredient', through='meals.DishIngredient'),
        ),
    ]
