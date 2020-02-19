# Generated by Django 2.0 on 2020-02-15 09:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rewards', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RewardCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(max_length=100, null=True)),
                ('reward_target', models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='rewardsession',
            name='category_id',
            field=models.ForeignKey(default=1, on_delete='', to='rewards.RewardCategory'),
            preserve_default=False,
        ),
    ]