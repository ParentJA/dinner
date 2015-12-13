# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('recipes', '0006_auto_20151213_2048'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userreciperecord',
            options={'verbose_name': 'user_recipe_record', 'verbose_name_plural': 'user_recipe_records'},
        ),
        migrations.AddField(
            model_name='userreciperecord',
            name='created',
            field=models.DateTimeField(default=None, auto_created=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userreciperecord',
            name='recipe',
            field=models.ForeignKey(default=None, to='recipes.Recipe'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userreciperecord',
            name='updated',
            field=models.DateTimeField(default=None, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='userreciperecord',
            name='user',
            field=models.ForeignKey(default=None, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
