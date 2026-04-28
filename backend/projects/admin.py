from django.contrib import admin
from .models import Category, Project


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'icon', 'order')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('order', 'name')
    list_editable = ('order',)
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Informations principales', {'fields': ('name', 'slug', 'icon', 'description', 'order')}),
        ('Dates système', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'project_type', 'category', 'is_featured', 'is_published', 'date_realized', 'order')
    list_filter = ('project_type', 'category', 'is_featured', 'is_published')
    search_fields = ('title', 'description_short', 'description_long')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('-is_featured', 'order', '-date_realized')
    date_hierarchy = 'date_realized'
    list_editable = ('order', 'is_featured', 'is_published')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Informations principales', {'fields': ('title', 'slug', 'project_type', 'category')}),
        ('Descriptions', {'fields': ('description_short', 'description_long')}),
        ('Médias', {'fields': ('thumbnail', 'report_pdf')}),
        ('Liens externes', {'fields': ('github_url', 'demo_url')}),
        ('Stack & Métadonnées', {'fields': ('tech_stack', 'date_realized', 'is_featured', 'is_published', 'order')}),
        ('Dates système', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )
