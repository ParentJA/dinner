# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0004_auto_20151102_1938'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='pantryfood',
            unique_together=set([('pantry', 'food')]),
        ),
    ]
