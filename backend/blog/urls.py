from rest_framework.routers import DefaultRouter
from .views import TagViewSet, ArticleViewSet

router = DefaultRouter()
router.register('tags', TagViewSet, basename='tag')
router.register('articles', ArticleViewSet, basename='article')

urlpatterns = router.urls
