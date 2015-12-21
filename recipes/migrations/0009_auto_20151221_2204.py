# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0008_auto_20151218_0319'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='userfavorite',
            unique_together=set([('user', 'recipe')]),
        ),
        migrations.AlterUniqueTogether(
            name='userrating',
            unique_together=set([('user', 'recipe')]),
        ),
    ]
