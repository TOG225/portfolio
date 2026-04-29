from django.core.management.base import BaseCommand
from blog.models import Article, Tag
from django.utils.text import slugify


class Command(BaseCommand):
    help = 'Seed 12 test articles for pagination testing'

    def handle(self, *args, **options):
        tags_data = [
            {'name': 'Pentest', 'color': '#FAECE7'},
            {'name': 'SOC', 'color': '#E1F5EE'},
            {'name': 'CTF', 'color': '#EEEDFE'},
        ]
        for td in tags_data:
            Tag.objects.get_or_create(name=td['name'], defaults={'slug': slugify(td['name']), 'color': td['color']})

        for i in range(1, 13):
            title = f'Article test {i}'
            slug = slugify(title)
            Article.objects.update_or_create(
                slug=slug,
                defaults={
                    'title': title,
                    'excerpt': f"Ceci est l'extrait de l'article test numéro {i}.",
                    'content': f'# Article {i}\n\nContenu de démonstration pour tester la pagination.',
                    'reading_time': i % 10 + 1,
                    'is_published': True,
                }
            )

        self.stdout.write(self.style.SUCCESS('12 articles test créés'))
