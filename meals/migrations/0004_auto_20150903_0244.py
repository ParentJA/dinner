# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0003_dish_ingredients'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cuisine',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='Source',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(unique=True, max_length=250)),
            ],
        ),
        migrations.AddField(
            model_name='dish',
            name='cuisine',
            field=models.ForeignKey(related_name='dishes', blank=True, to='meals.Cuisine', null=True),
        ),
        migrations.AddField(
            model_name='dish',
            name='source',
            field=models.ForeignKey(related_name='dishes', blank=True, to='meals.Source', null=True),
        ),
    ]
