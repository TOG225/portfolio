from rest_framework import viewsets, filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from .models import Tag, Article, Comment
from .serializers import (
    TagSerializer, ArticleListSerializer, ArticleDetailSerializer,
    CommentSerializer, CommentCreateSerializer,
)


class CommentRateThrottle(AnonRateThrottle):
    rate = '5/hour'


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


class ArticleCommentView(APIView):
    throttle_classes = [CommentRateThrottle]

    def get(self, request, slug):
        article = get_object_or_404(Article, slug=slug, is_published=True)
        comments = article.comments.filter(is_approved=True)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, slug):
        article = get_object_or_404(Article, slug=slug, is_published=True)
        serializer = CommentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(article=article)
            return Response(
                {'detail': 'Commentaire soumis — il sera visible après modération.'},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
