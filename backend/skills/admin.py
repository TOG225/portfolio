from django.contrib import admin
from .models import SkillCategory, Skill


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'icon', 'color', 'order')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('order', 'name')
    list_editable = ('order', 'color')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Informations principales', {'fields': ('name', 'slug', 'icon', 'color', 'order')}),
        ('Dates système', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'level', 'order')
    list_filter = ('category', 'level')
    search_fields = ('name',)
    ordering = ('category', 'order', 'name')
    list_editable = ('order', 'level')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Informations principales', {'fields': ('name', 'category', 'level', 'order')}),
        ('Dates système', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )
