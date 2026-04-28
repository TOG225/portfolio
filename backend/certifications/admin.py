from django.contrib import admin
from .models import Certification


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('name', 'issuer', 'date_obtained', 'is_featured', 'order')
    list_filter = ('issuer', 'is_featured')
    search_fields = ('name', 'issuer')
    ordering = ('-is_featured', 'order', '-date_obtained')
    date_hierarchy = 'date_obtained'
    list_editable = ('order', 'is_featured')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Informations principales', {'fields': ('name', 'issuer', 'logo')}),
        ('Liens', {'fields': ('credential_url',)}),
        ('Métadonnées', {'fields': ('date_obtained', 'is_featured', 'order')}),
        ('Dates système', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )
