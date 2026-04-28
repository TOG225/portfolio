from django.db import migrations
from django.utils.text import slugify


SKILL_CATEGORIES = [
    {'name': 'Sécurité Offensive',       'color': '#FAECE7', 'order': 1},
    {'name': 'SOC & Défense',            'color': '#E1F5EE', 'order': 2},
    {'name': 'Forensique',               'color': '#FAEEDA', 'order': 3},
    {'name': 'Réseaux & Systèmes',       'color': '#EEEDFE', 'order': 4},
    {'name': 'DevSecOps & IaC',          'color': '#E8F1F8', 'order': 5},
    {'name': 'Gouvernance & Conformité', 'color': '#F4E8FB', 'order': 6},
    {'name': 'Développement',            'color': '#E8EAF6', 'order': 7},
]


def create_skill_categories(apps, schema_editor):
    SkillCategory = apps.get_model('skills', 'SkillCategory')
    for cat in SKILL_CATEGORIES:
        SkillCategory.objects.get_or_create(
            name=cat['name'],
            defaults={
                'slug': slugify(cat['name']),
                'color': cat['color'],
                'order': cat['order'],
            },
        )


def reverse_skill_categories(apps, schema_editor):
    SkillCategory = apps.get_model('skills', 'SkillCategory')
    SkillCategory.objects.filter(name__in=[c['name'] for c in SKILL_CATEGORIES]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('skills', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_skill_categories, reverse_skill_categories),
    ]
