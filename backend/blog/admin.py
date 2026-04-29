from django.contrib import admin
from .models import Tag, Article, Comment


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'color')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Informations principales', {'fields': ('name', 'slug', 'color')}),
        ('Dates système', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_published', 'reading_time', 'published_at', 'created_at')
    list_filter = ('is_published', 'tags')
    search_fields = ('title', 'excerpt', 'content')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('-published_at', '-created_at')
    date_hierarchy = 'published_at'
    list_editable = ('is_published',)
    readonly_fields = ('created_at', 'updated_at')
    filter_horizontal = ('tags',)
    fieldsets = (
        ('Informations principales', {'fields': ('title', 'slug', 'excerpt')}),
        ('Contenu', {'fields': ('content', 'cover_image')}),
        ('Classification', {'fields': ('tags',)}),
        ('Publication', {'fields': ('is_published', 'published_at', 'reading_time')}),
        ('Dates système', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'article', 'is_approved', 'created_at')
    list_filter = ('is_approved',)
    list_editable = ('is_approved',)
    search_fields = ('author_name', 'content', 'article__title')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Commentaire', {'fields': ('article', 'author_name', 'author_email', 'content')}),
        ('Modération', {'fields': ('is_approved',)}),
        ('Dates système', {'fields': ('created_at',), 'classes': ('collapse',)}),
    )
