from django.db import models


class Certification(models.Model):
    """Certification professionnelle ou académique (Cisco, IBM, Credly, etc.)."""

    name = models.CharField(max_length=200, verbose_name='Nom')
    issuer = models.CharField(max_length=100, verbose_name='Organisme émetteur')
    logo = models.ImageField(upload_to='cert_logos/', blank=True, verbose_name='Logo')
    credential_url = models.URLField(blank=True, verbose_name='Lien Credly / Coursera')
    logo_url = models.URLField(blank=True, verbose_name='URL logo externe', help_text='URL vers le logo officiel (optionnel)')
    date_obtained = models.DateField(verbose_name="Date d'obtention")
    is_featured = models.BooleanField(default=False, verbose_name='En vedette')
    order = models.PositiveIntegerField(default=0, verbose_name='Ordre')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Modifié le')

    class Meta:
        ordering = ['-is_featured', 'order', '-date_obtained']
        verbose_name = 'Certification'
        verbose_name_plural = 'Certifications'

    def __str__(self):
        return f"{self.name} — {self.issuer}"
