from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProjectViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('projects', ProjectViewSet, basename='project')

urlpatterns = router.urls
