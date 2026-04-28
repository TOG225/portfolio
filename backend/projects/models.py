from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    """Catégorie de projet correspondant aux matières HESTIM."""

    name = models.CharField(max_length=100, unique=True, verbose_name='Nom')
    slug = models.SlugField(unique=True, blank=True, verbose_name='Slug')
    icon = models.CharField(max_length=50, blank=True, verbose_name='Icône')
    description = models.TextField(blank=True, verbose_name='Description')
    order = models.PositiveIntegerField(default=0, verbose_name='Ordre')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Modifié le')

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Catégorie'
        verbose_name_plural = 'Catégories'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Project(models.Model):
    """Projet académique ou personnel présenté dans le portfolio."""

    PROJECT_TYPE_CHOICES = [
        ('academic', 'Académique'),
        ('personal', 'Personnel'),
    ]

    title = models.CharField(max_length=200, verbose_name='Titre')
    slug = models.SlugField(unique=True, blank=True, verbose_name='Slug')
    description_short = models.CharField(max_length=300, verbose_name='Description courte')
    description_long = models.TextField(verbose_name='Description longue (Markdown)')
    project_type = models.CharField(
        max_length=20,
        choices=PROJECT_TYPE_CHOICES,
        verbose_name='Type de projet',
    )
    category = models.ForeignKey(
        Category,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='projects',
        verbose_name='Catégorie',
    )
    github_url = models.URLField(blank=True, verbose_name='URL GitHub')
    demo_url = models.URLField(blank=True, verbose_name='URL Démo')
    report_pdf = models.FileField(upload_to='reports/', blank=True, verbose_name='Rapport PDF')
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, verbose_name='Miniature')
    tech_stack = models.JSONField(default=list, verbose_name='Stack technique')
    date_realized = models.DateField(verbose_name='Date de réalisation')
    is_featured = models.BooleanField(default=False, verbose_name='En vedette')
    is_published = models.BooleanField(default=True, verbose_name='Publié')
    order = models.PositiveIntegerField(default=0, verbose_name='Ordre')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Modifié le')

    class Meta:
        ordering = ['-is_featured', 'order', '-date_realized']
        verbose_name = 'Projet'
        verbose_name_plural = 'Projets'

    def __str__(self):
        return f"{self.title} ({self.get_project_type_display()})"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
