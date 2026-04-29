from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import CTFEvent, Platform
from .serializers import CTFEventSerializer, PlatformSerializer


class CTFEventViewSet(ReadOnlyModelViewSet):
    queryset = CTFEvent.objects.all()
    serializer_class = CTFEventSerializer
    filterset_fields = ['year', 'is_featured']
    ordering_fields = ['year', 'order', 'position']


class PlatformViewSet(ReadOnlyModelViewSet):
    queryset = Platform.objects.filter(is_visible=True)
    serializer_class = PlatformSerializer
