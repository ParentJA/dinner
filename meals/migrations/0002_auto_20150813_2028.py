# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='dish',
            options={'verbose_name_plural': 'dishes'},
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='name',
            field=models.CharField(unique=True, max_length=250),
        ),
        migrations.AlterUniqueTogether(
            name='dishingredient',
            unique_together=set([('dish', 'ingredient')]),
        ),
    ]
