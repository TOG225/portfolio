from django.contrib import admin
from .models import CTFEvent, Platform


@admin.register(CTFEvent)
class CTFEventAdmin(admin.ModelAdmin):
    list_display = ['name', 'year', 'position', 'team_name', 'category', 'is_featured']
    list_filter = ['year', 'position', 'is_featured']
    list_editable = ['is_featured']
    search_fields = ['name', 'team_name']
    ordering = ['-year', 'order']
    fields = [
        'name', 'year', 'position', 'team_name', 'category', 'prize_amount',
        'country', 'description', 'logo', 'event_url', 'is_featured', 'order',
    ]


@admin.register(Platform)
class PlatformAdmin(admin.ModelAdmin):
    list_display = ['platform', 'username', 'rank', 'rooms_completed', 'streak_days', 'is_visible']
    list_editable = ['is_visible']
    fields = [
        'platform', 'username', 'profile_url', 'logo', 'rank', 'points',
        'rooms_completed', 'streak_days', 'is_visible', 'order',
    ]
