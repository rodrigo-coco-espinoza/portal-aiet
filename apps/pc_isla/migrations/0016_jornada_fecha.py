# Generated by Django 4.2.4 on 2024-04-18 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pc_isla', '0015_jornada_extra_alter_proyecto_protocolo'),
    ]

    operations = [
        migrations.AddField(
            model_name='jornada',
            name='fecha',
            field=models.DateField(blank=True, null=True),
        ),
    ]