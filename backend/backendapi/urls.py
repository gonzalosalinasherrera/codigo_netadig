from rest_framework import routers
from django.urls import path
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.conf import settings
from .views import OrganizacionViewSet, UserViewSet, UserProfileViewSet, GrupoViewSet, SolicitudOrganizacionViewSet, GrupoEnOrganizacionViewSet, SolicitudGrupoViewSet, SolicitudGEOViewSet, PrivilegiosViewSet, SociosViewSet, ImageViewSet, AnunciosOrganizacionViewSet, AnunciosGrupoViewSet, AnunciosGrupoOrganizacionViewSet
from django.views.decorators.csrf import csrf_exempt
from django.contrib import admin

router = routers.DefaultRouter()
router.register('users',UserViewSet)
router.register('profile',UserProfileViewSet,basename='profiles')
router.register('grupos',GrupoViewSet)
router.register('organizaciones',OrganizacionViewSet)
#router.register('current', CurrentUserView)
router.register('grupos_organizacion',GrupoEnOrganizacionViewSet)
#router.register('solicitudrupo',SolicitudGrupoViewSet)
router.register('solicitud_organizacion', SolicitudOrganizacionViewSet, basename='solicitud_org')
router.register('solicitud_grupo', SolicitudGrupoViewSet, basename='solicitud_gr')
router.register('solicitud_geo',SolicitudGEOViewSet, basename='solicitud_in_geo')
router.register('privilegios_en_org',PrivilegiosViewSet, basename='priv_en_org')
router.register('socios_org',SociosViewSet,basename='socios_de_la_org')
router.register('imagenes',ImageViewSet, basename='img')
router.register('anuncios_org',AnunciosOrganizacionViewSet)
router.register('anuncios_grupo', AnunciosGrupoViewSet)
router.register('anuncios_grupo_org',AnunciosGrupoOrganizacionViewSet)

urlpatterns = [
    path('',include(router.urls))
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
