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
        """URL absolue du fichier uploadé, sinon URL externe stockée sur le modèle."""
        request = self.context.get('request')
        if obj.logo:
            path = obj.logo.url
            return request.build_absolute_uri(path) if request else path
        if obj.logo_url:
            return obj.logo_url
        return None
