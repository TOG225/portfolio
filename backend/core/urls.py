from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from core.views import ContactMessageView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/projects/', include('projects.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/certifications/', include('certifications.urls')),
    path('api/skills/', include('skills.urls')),
    path('api/ctf/', include('ctf.urls')),
    path('api/contact/', ContactMessageView.as_view(), name='contact'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    # En prod, WhiteNoise ne sert pas MEDIA_ROOT : exposition explicite des uploads admin.
    urlpatterns += [
        re_path(
            r'^media/(?P<path>.*)$',
            serve,
            {'document_root': settings.MEDIA_ROOT},
        ),
    ]
