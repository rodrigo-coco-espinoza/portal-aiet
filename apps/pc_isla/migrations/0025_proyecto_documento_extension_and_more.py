# Generated by Django 4.2.4 on 2024-06-11 16:05

import apps.pc_isla.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pc_isla', '0024_alter_institucion_direccion_alter_institucion_rut_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='proyecto',
            name='documento_extension',
            field=models.FileField(blank=True, max_length=500, null=True, upload_to=apps.pc_isla.models.documento_extension_upload_path),
        ),
        migrations.AddField(
            model_name='proyecto',
            name='fecha_extension',
            field=models.DateField(blank=True, null=True),
        ),
    ]