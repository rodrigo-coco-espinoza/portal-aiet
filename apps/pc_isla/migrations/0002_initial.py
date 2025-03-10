# Generated by Django 4.2.4 on 2024-10-29 12:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('pc_isla', '0001_initial'),
        ('base', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='proyecto',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='proyecto',
            name='backup_sii',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='backup_sii_proyecto', to='base.persona'),
        ),
        migrations.AddField(
            model_name='proyecto',
            name='encargado_sii',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='encargado_sii_proyecto', to='base.persona'),
        ),
        migrations.AddField(
            model_name='proyecto',
            name='institucion',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.institucion'),
        ),
        migrations.AddField(
            model_name='asistenciainvestigador',
            name='asistencia',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pc_isla.asistencia'),
        ),
        migrations.AddField(
            model_name='asistenciainvestigador',
            name='investigador',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.persona'),
        ),
        migrations.AddField(
            model_name='asistencia',
            name='proyecto',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='pc_isla.proyecto'),
        ),
    ]
