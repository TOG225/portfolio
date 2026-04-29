from rest_framework.routers import DefaultRouter
from .views import CTFEventViewSet, PlatformViewSet

router = DefaultRouter()
router.register(r'events', CTFEventViewSet, basename='ctfevent')
router.register(r'platforms', PlatformViewSet, basename='platform')

urlpatterns = router.urls
