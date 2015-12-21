# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import recipes.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('recipes', '0007_auto_20151213_2223'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserFavorite',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('recipe', models.ForeignKey(to='recipes.Recipe')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserRating',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('rating', models.DecimalField(help_text=b'A number between 1.0 and 5.0 (increments of 0.5)', max_digits=2, decimal_places=1, validators=[recipes.models.validate_rating])),
                ('recipe', models.ForeignKey(to='recipes.Recipe')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'user rating',
                'verbose_name_plural': 'user ratings',
                'default_related_name': 'user_ratings',
            },
        ),
        migrations.AlterModelOptions(
            name='userreciperecord',
            options={'verbose_name': 'user recipe record', 'verbose_name_plural': 'user recipe records'},
        ),
        migrations.AlterField(
            model_name='userreciperecord',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
