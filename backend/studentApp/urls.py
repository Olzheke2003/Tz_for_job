from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from .yasg import urlpatterns as doc_urls
from django.contrib import admin


urlpatterns = [
    path('api/', include('myapp.urls')),
]

urlpatterns += [
    path('auth/', include('djoser.urls')),
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls.authtoken')),
]


urlpatterns += doc_urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
