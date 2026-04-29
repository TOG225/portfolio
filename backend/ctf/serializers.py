from rest_framework import serializers
from .models import CTFEvent, Platform


class CTFEventSerializer(serializers.ModelSerializer):
    position_display = serializers.CharField(source='get_position_display', read_only=True)

    class Meta:
        model = CTFEvent
        fields = '__all__'


class PlatformSerializer(serializers.ModelSerializer):
    platform_display = serializers.CharField(source='get_platform_display', read_only=True)

    class Meta:
        model = Platform
        fields = '__all__'
