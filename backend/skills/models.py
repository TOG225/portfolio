from django.db import models
from django.utils.text import slugify


class SkillCategory(models.Model):
    """Catégorie regroupant des compétences techniques de même domaine."""

    name = models.CharField(max_length=100, unique=True, verbose_name='Nom')
    slug = models.SlugField(unique=True, blank=True, verbose_name='Slug')
    icon = models.CharField(max_length=50, blank=True, verbose_name='Icône')
    color = models.CharField(max_length=7, default='#1F3864', verbose_name='Couleur (hex)')
    order = models.PositiveIntegerField(default=0, verbose_name='Ordre')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Modifié le')

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Catégorie de compétences'
        verbose_name_plural = 'Catégories de compétences'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Skill(models.Model):
    """Compétence technique individuelle avec niveau de maîtrise."""

    LEVEL_CHOICES = [
        (1, 'Débutant'),
        (2, 'Intermédiaire'),
        (3, 'Avancé'),
    ]

    name = models.CharField(max_length=80, verbose_name='Nom')
    category = models.ForeignKey(
        SkillCategory,
        on_delete=models.CASCADE,
        related_name='skills',
        verbose_name='Catégorie',
    )
    level = models.IntegerField(choices=LEVEL_CHOICES, default=2, verbose_name='Niveau')
    order = models.PositiveIntegerField(default=0, verbose_name='Ordre')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Modifié le')

    class Meta:
        ordering = ['category', 'order', 'name']
        verbose_name = 'Compétence'
        verbose_name_plural = 'Compétences'

    def __str__(self):
        return f"{self.name} ({self.get_level_display()})"
