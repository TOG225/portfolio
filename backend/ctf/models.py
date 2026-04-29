from django.db import models


class CTFEvent(models.Model):
    POSITION_CHOICES = [
        (1, '🥇 1ère place'),
        (2, '🥈 2ème place'),
        (3, '🥉 3ème place'),
        (4, 'Top 5'),
        (5, 'Top 10'),
        (6, 'Participation'),
    ]

    name = models.CharField(max_length=200, verbose_name='Nom')
    year = models.PositiveIntegerField(verbose_name='Année')
    position = models.IntegerField(choices=POSITION_CHOICES, null=True, blank=True, verbose_name='Position')
    team_name = models.CharField(max_length=100, blank=True, verbose_name='Équipe')
    category = models.CharField(max_length=100, blank=True, verbose_name='Catégorie', help_text='Web, Crypto, Pwn, Reverse...')
    prize_amount = models.CharField(max_length=50, blank=True, verbose_name='Prix', help_text='ex: 80,000 DH')
    country = models.CharField(max_length=50, blank=True, verbose_name='Pays')
    description = models.TextField(blank=True, verbose_name='Description')
    logo = models.ImageField(upload_to='ctf/events/', blank=True, verbose_name='Logo')
    event_url = models.URLField(blank=True, verbose_name="URL de l'événement")
    is_featured = models.BooleanField(default=False, verbose_name='En vedette')
    order = models.PositiveIntegerField(default=0, verbose_name='Ordre')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Événement CTF'
        verbose_name_plural = 'Événements CTF'
        ordering = ['-year', 'order', 'position']

    def __str__(self):
        pos = self.get_position_display() if self.position else 'Participation'
        return f"{self.name} ({self.year}) — {pos}"


class Platform(models.Model):
    PLATFORM_CHOICES = [
        ('tryhackme',   'TryHackMe'),
        ('hackthebox',  'HackTheBox'),
        ('rootme',      'Root-Me'),
        ('portswigger', 'PortSwigger Web Security'),
        ('vulnhub',     'VulnHub'),
        ('pwncollege',  'pwn.college'),
    ]

    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES, unique=True, verbose_name='Plateforme')
    username = models.CharField(max_length=100, verbose_name='Pseudo')
    profile_url = models.URLField(verbose_name='URL du profil')
    logo = models.ImageField(upload_to='ctf/platforms/', blank=True, verbose_name='Logo')
    rank = models.CharField(max_length=50, blank=True, verbose_name='Rang', help_text='ex: Pro Hacker, Top 1%')
    points = models.PositiveIntegerField(null=True, blank=True, verbose_name='Points')
    rooms_completed = models.PositiveIntegerField(null=True, blank=True, verbose_name='Rooms complétées')
    streak_days = models.PositiveIntegerField(null=True, blank=True, verbose_name='Streak (jours)')
    is_visible = models.BooleanField(default=True, verbose_name='Visible')
    order = models.PositiveIntegerField(default=0, verbose_name='Ordre')

    class Meta:
        verbose_name = 'Plateforme'
        verbose_name_plural = 'Plateformes'
        ordering = ['order', 'platform']

    def __str__(self):
        return f"{self.get_platform_display()} — {self.username}"
