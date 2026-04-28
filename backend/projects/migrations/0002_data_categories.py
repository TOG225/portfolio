from django.db import migrations
from django.utils.text import slugify


CATEGORIES = [
    {'name': 'SOC & SIEM',                    'icon': 'shield',   'order': 1},
    {'name': 'Pentest',                        'icon': 'bug',      'order': 2},
    {'name': 'Forensique & Cryptographie',     'icon': 'search',   'order': 3},
    {'name': 'Cyber Threat Intelligence',      'icon': 'eye',      'order': 4},
    {'name': 'Réseaux & Architecture',         'icon': 'network',  'order': 5},
    {'name': 'DevSecOps',                      'icon': 'code',     'order': 6},
    {'name': 'Gouvernance',                    'icon': 'book',     'order': 7},
]


def create_categories(apps, schema_editor):
    Category = apps.get_model('projects', 'Category')
    for cat in CATEGORIES:
        Category.objects.get_or_create(
            name=cat['name'],
            defaults={
                'slug': slugify(cat['name']),
                'icon': cat['icon'],
                'order': cat['order'],
            },
        )


def reverse_categories(apps, schema_editor):
    Category = apps.get_model('projects', 'Category')
    Category.objects.filter(name__in=[c['name'] for c in CATEGORIES]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_categories, reverse_categories),
    ]
