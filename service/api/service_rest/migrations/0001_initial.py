# Generated by Django 4.0.3 on 2023-01-26 18:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vin', models.CharField(max_length=17)),
            ],
        ),
        migrations.CreateModel(
            name='Technician',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tech_name', models.CharField(max_length=150)),
                ('employee_number', models.PositiveSmallIntegerField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.CharField(max_length=200)),
                ('date', models.DateField()),
                ('time', models.TimeField(max_length=10)),
                ('reason', models.TextField(max_length=500)),
                ('vin', models.CharField(max_length=17)),
                ('tech_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to='service_rest.technician')),
            ],
        ),
    ]
