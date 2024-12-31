# Generated by Django 5.1.4 on 2024-12-24 22:52

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('type', models.CharField(default='item', max_length=100)),
                ('remark', models.CharField(default='', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('table_number', models.IntegerField()),
                ('people', models.IntegerField()),
                ('ordered_items', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, default=list, size=None)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_settled', models.BooleanField(default=False)),
                ('bill_amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('server_name', models.CharField(max_length=100)),
                ('tip', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('has_customer', models.BooleanField(default=False)),
                ('table_number', models.IntegerField()),
                ('order_id', models.IntegerField(default=-1)),
                ('items', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, size=10)),
            ],
        ),
    ]
