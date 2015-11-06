# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0003_auto_20151102_1434'),
    ]

    operations = [
        migrations.AddField(
            model_name='pricecomponent',
            name='amount',
            field=models.DecimalField(help_text=b'ex. 0.500 (one half), 0.250 (one fourth), 0.125 (one eighth)', null=True, max_digits=6, decimal_places=3, blank=True),
        ),
        migrations.AlterField(
            model_name='pricecomponent',
            name='unit_of_measure',
            field=models.ForeignKey(blank=True, to='recipes.UnitOfMeasure', null=True),
        ),
    ]
