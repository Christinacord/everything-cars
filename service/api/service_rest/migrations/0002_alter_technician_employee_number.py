# Generated by Django 4.0.3 on 2023-01-24 00:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='technician',
            name='employee_number',
            field=models.PositiveSmallIntegerField(unique=True),
        ),
    ]
