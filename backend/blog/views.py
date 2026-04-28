from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Tag, Article
from .serializers import TagSerializer, ArticleListSerializer, ArticleDetailSerializer


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'slug'


class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Article.objects.filter(is_published=True)
        .prefetch_related('tags')
        .order_by('-published_at')
    )
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['tags__slug']
    search_fields = ['title', 'excerpt', 'content']
    ordering = ['-published_at']
    ordering_fields = ['published_at', 'reading_time', 'created_at']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ArticleDetailSerializer
        return ArticleListSerializer
