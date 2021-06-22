from django.contrib import admin

# Register your models here.
from .models import UserProfile, Organizacion, Grupo, GrupoEnOrganizacion, SolicitudOrganizacion, SolicitudGEO, SolicitudGrupo, Privilegios, Socios, Image, AnunciosOrganizacion, AnunciosGrupo, AnunciosGrupoOrganizacion
admin.site.register(UserProfile)
admin.site.register(Organizacion)
admin.site.register(Grupo)
admin.site.register(GrupoEnOrganizacion)
admin.site.register(SolicitudOrganizacion)
admin.site.register(SolicitudGrupo)
admin.site.register(SolicitudGEO)
admin.site.register(Privilegios)
admin.site.register(Socios)
admin.site.register(Image)
admin.site.register(AnunciosOrganizacion)
admin.site.register(AnunciosGrupo)
admin.site.register(AnunciosGrupoOrganizacion)