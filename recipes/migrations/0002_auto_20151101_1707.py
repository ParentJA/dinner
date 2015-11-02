# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userpantry',
            options={'verbose_name': 'user pantry', 'verbose_name_plural': 'user pantries'},
        ),
        migrations.AddField(
            model_name='pantryfood',
            name='amount',
            field=models.DecimalField(help_text=b'ex. 0.500 (one half), 0.250 (one fourth), 0.125 (one eighth)', null=True, max_digits=6, decimal_places=3, blank=True),
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='amount',
            field=models.DecimalField(help_text=b'ex. 0.500 (one half), 0.250 (one fourth), 0.125 (one eighth)', null=True, max_digits=6, decimal_places=3, blank=True),
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='description',
            field=models.CharField(help_text=b'ex. 2 cloves of garlic, minced', max_length=255),
        ),
        migrations.AlterField(
            model_name='pantryfood',
            name='unit_of_measure',
            field=models.ForeignKey(blank=True, to='recipes.UnitOfMeasure', null=True),
        ),
        migrations.AlterField(
            model_name='pricecomponent',
            name='price',
            field=models.DecimalField(help_text=b'ex. 1.25 ($1.25)', max_digits=6, decimal_places=2),
        ),
    ]
