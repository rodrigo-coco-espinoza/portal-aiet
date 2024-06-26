# Generated by Django 4.2.4 on 2024-04-03 12:34

import apps.pc_isla.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pc_isla', '0009_alter_persona_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='proyecto',
            name='fecha_inicio',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='proyecto',
            name='fecha_termino',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='proyecto',
            name='protocolo',
            field=models.FileField(blank=True, max_length=500, null=True, upload_to=apps.pc_isla.models.proyecto_upload_path),
        ),
        migrations.CreateModel(
            name='Rol',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rol', models.CharField(choices=[('encargado', 'Encargado'), ('investigador', 'Investigador')], max_length=50)),
                ('persona', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pc_isla.persona')),
                ('proyecto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pc_isla.proyecto')),
            ],
            options={
                'verbose_name': 'Rol',
                'verbose_name_plural': 'Roles',
            },
        ),
        migrations.CreateModel(
            name='Jornada',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('equipo', models.CharField(choices=[('Bora Bora', 'Bora Bora'), ('Juan Fernández', 'Juan Fernández'), ('Rapa Nui', 'Rapa Nui')], max_length=50)),
                ('horario', models.CharField(choices=[('AM', 'AM'), ('PM', 'PM')], max_length=50)),
                ('dia', models.CharField(choices=[('lunes', 'Lunes'), ('martes', 'Martes'), ('miércoles', 'Miércoles'), ('jueves', 'Jueves'), ('viernes', 'Viernes')], max_length=50)),
                ('proyecto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pc_isla.proyecto')),
            ],
            options={
                'verbose_name': 'Jornada',
                'verbose_name_plural': 'Jornadas',
            },
        ),
    ]
