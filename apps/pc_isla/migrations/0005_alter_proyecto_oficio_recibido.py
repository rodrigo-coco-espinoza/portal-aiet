# Generated by Django 4.2.4 on 2024-03-06 18:17

import apps.pc_isla.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pc_isla', '0004_alter_persona_area_alter_persona_cargo_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proyecto',
            name='oficio_recibido',
            field=models.FileField(upload_to=apps.pc_isla.models.proyecto_upload_path),
        ),
    ]
