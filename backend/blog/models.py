from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class Tag(models.Model):
    """Étiquette thématique pour classifier les articles de veille."""

    name = models.CharField(max_length=50, unique=True, verbose_name='Nom')
    slug = models.SlugField(unique=True, blank=True, verbose_name='Slug')
    color = models.CharField(max_length=7, default='#2E75B6', verbose_name='Couleur (hex)')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Modifié le')

    class Meta:
        ordering = ['name']
        verbose_name = 'Tag'
        verbose_name_plural = 'Tags'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Article(models.Model):
    """Article de blog ou note de veille technique (contenu Markdown)."""

    title = models.CharField(max_length=200, verbose_name='Titre')
    slug = models.SlugField(unique=True, blank=True, verbose_name='Slug')
    excerpt = models.CharField(max_length=300, verbose_name='Résumé')
    content = models.TextField(verbose_name='Contenu (Markdown)')
    cover_image = models.ImageField(upload_to='blog/', blank=True, verbose_name='Image de couverture')
    tags = models.ManyToManyField(Tag, blank=True, verbose_name='Tags')
    reading_time = models.PositiveIntegerField(default=0, verbose_name='Temps de lecture (min)')
    is_published = models.BooleanField(default=False, verbose_name='Publié')
    published_at = models.DateTimeField(null=True, blank=True, verbose_name='Date de publication')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Modifié le')

    class Meta:
        ordering = ['-published_at', '-created_at']
        verbose_name = 'Article'
        verbose_name_plural = 'Articles'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if self.reading_time == 0 and self.content:
            self.reading_time = max(1, len(self.content.split()) // 200)
        if self.is_published and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)


class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')
    author_name = models.CharField(max_length=100, verbose_name='Nom')
    author_email = models.EmailField(blank=True, verbose_name='Email (optionnel)')
    content = models.TextField(max_length=2000, verbose_name='Commentaire')
    is_approved = models.BooleanField(default=False, verbose_name='Approuvé')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Créé le')

    class Meta:
        ordering = ['created_at']
        verbose_name = 'Commentaire'
        verbose_name_plural = 'Commentaires'

    def __str__(self):
        return f'{self.author_name} — {self.article.title[:40]}'
