# Generated by Django 4.2.4 on 2024-04-09 11:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pc_isla', '0012_alter_proyecto_fecha_inicio_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='proyecto',
            name='fecha_inicio',
        ),
        migrations.RemoveField(
            model_name='proyecto',
            name='fecha_termino',
        ),
    ]