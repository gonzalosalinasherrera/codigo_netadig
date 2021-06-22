from django.db import models
from django.contrib.auth.models import User
from django_countries.serializer_fields import CountryField
from rest_framework.settings import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

# Create your models here.
class UserProfile(models.Model):
    GENDERS = (('MASCULINO','MASCULINO'),('FEMENINO','FEMENINO'),('NO ESPECIFICAR','NO ESPECIFICAR'))
    usuario = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    avatar = models.FileField(upload_to='images/',default='images/perfil.png', blank=True)
    pais = models.CharField(max_length=50,blank=True)
    region = models.CharField(max_length=50,blank=True)
    ciudad = models.CharField(max_length=50,blank=True)
    direccion = models.CharField(max_length=50,blank=True)
    telefono = models.CharField(max_length=50,blank=True)
    ocupacion = models.CharField(max_length=50, blank=True)
    imgprofile = models.FileField(upload_to='images/',default='images/banner.jpg', blank=True)
    created_at = models.DateTimeField(auto_now_add=True,blank=True)
    updated_at = models.DateTimeField(auto_now=True,blank=True)
    fb = models.URLField(blank=True)
    ig = models.URLField(blank=True)
    tw = models.URLField(blank=True)
    gm = models.URLField(blank=True)
    bod = models.CharField(max_length=50,blank=True,null=True)
    gender = models.CharField(max_length=20,choices=GENDERS,blank=True)

    def __str__(self):
        return self.usuario.username

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_profile_for_new_user(sender,created,instance,**kwargs):
        if created:
            profile = UserProfile(usuario=instance)
            profile.save()

User.userprofile = property(lambda u:Userprofile.objects.get_or_create(user=u)[0])


class Organizacion(models.Model):
    TYPO = (('HIJO','HIJO'),('PADRE','PADRE'))
    nombre = models.CharField(max_length=50)
    pais = models.CharField(max_length=50, blank=True)
    region = models.CharField(max_length=50, blank=True)
    ciudad = models.CharField(max_length=50, blank=True)
    direccion = models.CharField(max_length=100, blank=True)
    bio = models.CharField(max_length=1500, blank=True)
    avatar = models.ImageField(upload_to='images/',default='images/no-img.jpg', blank=True)
    banner = models.ImageField(upload_to='images/',default='images/banner.jpg', blank=True) 
    miembros = models.ManyToManyField(UserProfile, blank=True)
    fb = models.URLField(blank=True)
    ig = models.URLField(blank=True)
    tw = models.URLField(blank=True)
    gm = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True,blank=True)
    updated_at = models.DateTimeField(auto_now=True,blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='admin_org')
    email = models.EmailField(blank=True)
    fono = models.CharField(max_length=50,blank=True)
    url = models.URLField(blank=True)
    activa = models.IntegerField(blank=True)
    tipo = models.CharField(max_length=5,choices=TYPO)


class GrupoEnOrganizacion(models.Model):
    organizacion = models.ForeignKey(Organizacion,on_delete=models.CASCADE, related_name='org')
    nombre = models.CharField(max_length=50)
    bio = models.CharField(max_length=1500)
    avatar = models.FileField(upload_to='images/',default='images/no-img.jpg', blank=True)
    banner = models.FileField(upload_to='images/',default='images/banner.png', blank=True) 
    fb = models.URLField(blank=True)
    ig = models.URLField(blank=True)
    tw = models.URLField(blank=True)
    gm = models.URLField(blank=True)
    miembros = models.ManyToManyField(UserProfile, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True,blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='admin_grupo_organizacion')


class SolicitudOrganizacion(models.Model):
    user_to_join = models.ManyToManyField(UserProfile, blank=True)
    probando = models.CharField(max_length=50,blank=True)


class Grupo(models.Model):
    nombre = models.CharField(max_length=50)
    bio = models.CharField(max_length=1500)
    avatar = models.FileField(upload_to='images/',default='images/no-img.jpg', blank=True)
    banner = models.FileField(upload_to='images/',default='images/banner_grupo.jpg', blank=True) 
    fb = models.CharField(max_length=1500,blank=True)
    ig = models.CharField(max_length=1500,blank=True)
    tw = models.CharField(max_length=1500,blank=True)
    gm = models.URLField(blank=True)
    miembros = models.ManyToManyField(UserProfile, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True,blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='admin_grupo')


class SolicitudGrupo(models.Model):
    user_in_grupo = models.ManyToManyField(UserProfile, blank=True)
    x = models.CharField(max_length=50,blank=True)


class SolicitudGEO(models.Model):
    user_in_geo = models.ManyToManyField(UserProfile, blank=True)
    y = models.CharField(max_length=50,blank=True)


class Privilegios(models.Model):
    Priv = (('1','1'),('2','2'))
    user_priv = models.ForeignKey(UserProfile,on_delete=models.CASCADE, related_name='privilegio')
    org_priv = models.ForeignKey(Organizacion,on_delete=models.CASCADE, related_name='org_privi')
    tipo = models.CharField(max_length=1,choices=Priv)


class Socios(models.Model):
    user_in_socio = models.ManyToManyField(UserProfile, blank=True)


class Image(models.Model):
    imagen = models.ImageField(upload_to='images/',default='images/no-img.jpg', blank=True)


class AnunciosOrganizacion(models.Model):
    org = models.ForeignKey(Organizacion, on_delete=models.CASCADE, related_name='org_anun')
    creador = models.ForeignKey(UserProfile, on_delete=models.CASCADE,related_name='creador')
    nombre = models.CharField(max_length=150, blank=True)
    nombre_org = models.CharField(max_length=150, blank=True)
    anuncio = models.CharField(max_length=1500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class AnunciosGrupo(models.Model):
    grupo = models.ForeignKey(Grupo, on_delete=models.CASCADE, related_name='grupo_anun')
    creador = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='creator')
    nombre = models.CharField(max_length=150, blank=True)
    nombre_grupo = models.CharField(max_length=150, blank=True)
    anuncio = models.CharField(max_length=1500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class AnunciosGrupoOrganizacion(models.Model):
    grupo = models.ForeignKey(GrupoEnOrganizacion, on_delete=models.CASCADE, related_name='grupo_anun_org')
    creador = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='creatoor')
    nombre = models.CharField(max_length=150, blank=True)
    nombre_grupo_org = models.CharField(max_length=150, blank=True)
    anuncio = models.CharField(max_length=1500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)