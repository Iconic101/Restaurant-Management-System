# Generated by Django 5.1.4 on 2024-12-24 22:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Server', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='table',
            name='items',
        ),
    ]