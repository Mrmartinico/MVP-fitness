# Generated by Django 2.0 on 2020-02-09 00:46

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('home', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='RewardSession',
            fields=[
                ('id', models.CharField(editable=False, max_length=25, primary_key=True, serialize=False)),
                ('week_number', models.IntegerField()),
                ('week_day', models.CharField(max_length=15)),
                ('date', models.DateField()),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('attendee_count', models.IntegerField(null=True)),
                ('created_at', models.DateTimeField()),
                ('session_duraton', models.DecimalField(decimal_places=2, max_digits=5)),
                ('session_path', models.CharField(max_length=250)),
                ('fitness_id', models.ForeignKey(on_delete='', related_name='fitness_types', to='home.Fitness')),
                ('instructor_id', models.ForeignKey(on_delete='', related_name='reward_instructor', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
