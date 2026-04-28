from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Project
from .serializers import CategorySerializer, ProjectListSerializer, ProjectDetailSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all().order_by('order', 'name')
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Project.objects.filter(is_published=True)
        .select_related('category')
        .order_by('-is_featured', 'order', '-date_realized')
    )
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['project_type', 'category__slug', 'is_featured']
    search_fields = ['title', 'description_short', 'description_long']
    ordering_fields = ['date_realized', 'order', 'created_at']
    ordering = ['-is_featured', 'order', '-date_realized']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectListSerializer
