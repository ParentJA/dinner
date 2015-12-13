# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0005_auto_20151102_2228'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserRecipeRecord',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='food',
            field=models.ForeignKey(related_name='ingredients', to='recipes.Food'),
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='recipe',
            field=models.ForeignKey(related_name='ingredients', to='recipes.Recipe'),
        ),
    ]
