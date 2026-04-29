from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TagViewSet, ArticleViewSet, ArticleCommentView

router = DefaultRouter()
router.register('tags', TagViewSet, basename='tag')
router.register('articles', ArticleViewSet, basename='article')

urlpatterns = router.urls + [
    path('articles/<slug:slug>/comments/', ArticleCommentView.as_view(), name='article-comments'),
]
