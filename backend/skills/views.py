from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import SkillCategory, Skill
from .serializers import SkillCategorySerializer, SkillSerializer


class SkillCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SkillCategory.objects.prefetch_related('skills').all()
    serializer_class = SkillCategorySerializer
    lookup_field = 'slug'


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.select_related('category').all()
    serializer_class = SkillSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category__slug']
    search_fields = ['name']
    ordering_fields = ['order', 'level', 'name']
    ordering = ['category', 'order', 'name']
