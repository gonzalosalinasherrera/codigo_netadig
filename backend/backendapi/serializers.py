from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import UserProfile, Organizacion, Grupo, GrupoEnOrganizacion, SolicitudOrganizacion, SolicitudGEO, SolicitudGrupo, Privilegios, Socios, Image, AnunciosOrganizacion, AnunciosGrupo, AnunciosGrupoOrganizacion
from rest_framework.response import Response
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','password','email','first_name','last_name')
        extra_kwargs = {'password':{'required':True, 'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    usuario = UserSerializer(read_only=True)
    class Meta:
        model = UserProfile
        fields = ('id','avatar','pais','region','ciudad','direccion','telefono','imgprofile','usuario','created_at','updated_at','fb','ig','tw','gm','ocupacion','bod','gender')
        read_only_fields = ['avatar','imgprofile']

    def create(self,validated_data):
        usuario_data = validated_data.pop('usuario')
        usuario = UserSerializer.create(UserSerializer(), validated_data=user_data)
        profile, created = UserProfile.objects.update_or_create(user=user)
        return profile


class OrganizacionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    activa = serializers.BooleanField()   
    class Meta:
        model = Organizacion
        fields = ('id','nombre','pais','region','ciudad','direccion','bio','avatar','banner','miembros','fb','ig','tw','gm','created_at','updated_at','created_by','email','fono','url','activa','tipo')
        read_only_fields = ['avatar']
            


class GrupoEnOrganizacionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = GrupoEnOrganizacion
        fields = ('id','organizacion','nombre','bio','avatar','banner','miembros','fb','ig','tw','gm','created_at','updated_at','created_by')


class GrupoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Grupo
        fields = ('id','nombre','bio','avatar','banner','miembros','fb','ig','tw','gm','created_at','updated_at','created_by')


class SolicitudOrganizacionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = SolicitudOrganizacion
        fields = ('id','user_to_join','probando')


class SolicitudGrupoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = SolicitudGrupo
        fields = ('id','user_in_grupo','x')


class SolicitudGEOSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = SolicitudGEO
        fields = ('id','user_in_geo','y')


class PrivilegiosSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Privilegios
        fields = ('id','user_priv','org_priv','tipo')


class SociosSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Socios
        fields = ('id','user_in_socio')
    
class AvatarOrganizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizacion
        fields = ('avatar')

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class AnunciosOrganizacionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = AnunciosOrganizacion
        fields = '__all__'


class AnunciosGrupoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = AnunciosGrupo
        fields = '__all__'


class AnunciosGrupoOrganizacionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = AnunciosGrupoOrganizacion 
        fields = '__all__'