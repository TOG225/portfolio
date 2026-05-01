from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve
from django.views.decorators.clickjacking import xframe_options_exempt
from core.views import ContactMessageView


@xframe_options_exempt
def serve_media(request, path):
    """Sert les uploads ; exempt du X-Frame-Options pour afficher les PDF en iframe depuis le frontend."""
    return serve(request, path, document_root=settings.MEDIA_ROOT)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/projects/', include('projects.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/certifications/', include('certifications.urls')),
    path('api/skills/', include('skills.urls')),
    path('api/ctf/', include('ctf.urls')),
    path('api/contact/', ContactMessageView.as_view(), name='contact'),
]

# Fichiers uploadés (admin) — WhiteNoise ne couvre pas MEDIA_ROOT ; même vue en dev et prod.
urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve_media),
]
