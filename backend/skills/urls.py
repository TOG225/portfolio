from rest_framework.routers import DefaultRouter
from .views import SkillCategoryViewSet, SkillViewSet

router = DefaultRouter()
router.register('skill-categories', SkillCategoryViewSet, basename='skill-category')
router.register('skills', SkillViewSet, basename='skill')

urlpatterns = router.urls
