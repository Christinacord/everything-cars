# Generated by Django 4.0.3 on 2023-01-26 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='price',
            field=models.IntegerField(),
        ),
    ]
