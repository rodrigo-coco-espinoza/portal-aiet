# Generated by Django 4.2.4 on 2024-04-23 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pc_isla', '0018_asistencia'),
    ]

    operations = [
        migrations.AddField(
            model_name='asistencia',
            name='detatime_ingreso',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]