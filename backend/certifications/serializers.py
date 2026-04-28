from rest_framework import serializers
from .models import Certification


class CertificationSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = Certification
        fields = [
            'id', 'name', 'issuer', 'logo', 'logo_url',
            'credential_url', 'date_obtained', 'is_featured',
            'order', 'created_at', 'updated_at',
        ]

    def get_logo_url(self, obj):
        if not obj.logo:
            return None
        request = self.context.get('request')
        return request.build_absolute_uri(obj.logo.url) if request else obj.logo.url
