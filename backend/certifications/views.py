from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Certification
from .serializers import CertificationSerializer


class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certification.objects.all().order_by('-is_featured', 'order', '-date_obtained')
    serializer_class = CertificationSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['issuer', 'is_featured']
    ordering = ['-is_featured', 'order', '-date_obtained']
    ordering_fields = ['date_obtained', 'order', 'is_featured']
