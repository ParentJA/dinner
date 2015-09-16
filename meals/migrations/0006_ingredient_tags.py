# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0005_auto_20150912_0138'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='tags',
            field=models.ManyToManyField(to='meals.Tag', through='meals.IngredientTag'),
        ),
    ]
