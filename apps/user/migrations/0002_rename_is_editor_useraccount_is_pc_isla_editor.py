# Generated by Django 4.2.4 on 2024-01-30 11:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='useraccount',
            old_name='is_editor',
            new_name='is_pc_isla_editor',
        ),
    ]
