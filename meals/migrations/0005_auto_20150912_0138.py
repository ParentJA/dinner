# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0004_auto_20150903_0244'),
    ]

    operations = [
        migrations.CreateModel(
            name='IngredientTag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('ingredient', models.ForeignKey(related_name='ingredient_tags', to='meals.Ingredient')),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=250)),
            ],
        ),
        migrations.AddField(
            model_name='ingredienttag',
            name='tag',
            field=models.ForeignKey(related_name='ingredient_tags', to='meals.Tag'),
        ),
        migrations.AlterUniqueTogether(
            name='ingredienttag',
            unique_together=set([('ingredient', 'tag')]),
        ),
    ]
