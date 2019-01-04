# Generated by Django 2.1.4 on 2019-01-02 12:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('musicband', '0003_auto_20190102_1551'),
    ]

    operations = [
        migrations.AddField(
            model_name='comments',
            name='kit_element',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='musicband.KitElement'),
        ),
        migrations.AddField(
            model_name='problems',
            name='instrument',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='musicband.Instrument'),
        ),
        migrations.AddField(
            model_name='problems',
            name='kit_element',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='musicband.KitElement'),
        ),
    ]
