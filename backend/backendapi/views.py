from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from .serializers import  UserSerializer, UserProfileSerializer, ImageSerializer, OrganizacionSerializer, GrupoEnOrganizacionSerializer, GrupoSerializer, SolicitudOrganizacionSerializer, SolicitudGrupoSerializer, SolicitudGEOSerializer, PrivilegiosSerializer, SociosSerializer, AnunciosOrganizacionSerializer, AnunciosGrupoOrganizacionSerializer, AnunciosGrupoSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile, Organizacion, Grupo, GrupoEnOrganizacion, SolicitudOrganizacion, SolicitudGEO, SolicitudGrupo, Privilegios, Socios, Image, AnunciosOrganizacion, AnunciosGrupo, AnunciosGrupoOrganizacion
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters,parsers
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
# Create your views here.

class OrganizacionViewSet(viewsets.ModelViewSet):
    queryset = Organizacion.objects.all()
    serializer_class = OrganizacionSerializer
    permission_classes = (AllowAny,)
    filter_backends = [DjangoFilterBackend]
    filter_fields = ('id','activa','created_by','nombre','pais','miembros')
    authentication_classes = (TokenAuthentication,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ('id','username','first_name','last_name')
    permission_classes = (AllowAny,)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = (AllowAny,)
    authentication_classes = (TokenAuthentication,)

class GrupoViewSet(viewsets.ModelViewSet):
    queryset = Grupo.objects.all()
    serializer_class = GrupoSerializer
    permission_classes = (AllowAny,)
    filter_backends = [DjangoFilterBackend]
    filter_fields = ('id','created_by','nombre','miembros')
    authentication_classes = (TokenAuthentication,)


class SolicitudOrganizacionViewSet(viewsets.ModelViewSet):
    queryset = SolicitudOrganizacion.objects.all()
    serializer_class = SolicitudOrganizacionSerializer
    permission_classes = (AllowAny,)
    filter_backends = [DjangoFilterBackend]
    authentication_classes = (TokenAuthentication,)


class GrupoEnOrganizacionViewSet(viewsets.ModelViewSet):
    queryset = GrupoEnOrganizacion.objects.all()
    serializer_class = GrupoEnOrganizacionSerializer
    permission_classes = (AllowAny,)
    filter_backends = [DjangoFilterBackend]
    filter_fields = ('id','created_by','nombre','organizacion','miembros')
    authentication_classes = (TokenAuthentication,)


class CustomAuthToken(ObtainAuthToken):
    def post(self,request, *arg, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
        })


class SolicitudGrupoViewSet(viewsets.ModelViewSet):
    queryset = SolicitudGrupo.objects.all()
    serializer_class = SolicitudGrupoSerializer
    permission_classes = (AllowAny,)
    filter_backends = [DjangoFilterBackend]
    authentication_classes = (TokenAuthentication,)

class SolicitudGEOViewSet(viewsets.ModelViewSet):
    queryset = SolicitudGEO.objects.all()
    serializer_class = SolicitudGEOSerializer
    permission_classes = (AllowAny,)
    filter_backends = [DjangoFilterBackend]
    authentication_classes = (TokenAuthentication,)

class PrivilegiosViewSet(viewsets.ModelViewSet):
    queryset = Privilegios.objects.all()
    serializer_class = PrivilegiosSerializer
    permission_classes = (AllowAny,)
    filter_backends = [DjangoFilterBackend]
    filter_fields = ('user_priv','org_priv','tipo')
    authentication_classes = (TokenAuthentication,)

class SociosViewSet(viewsets.ModelViewSet):
    queryset = Socios.objects.all()
    serializer_class = SociosSerializer
    permission_classes = (AllowAny,)
    filter_backends = [DjangoFilterBackend]
    authentication_classes = (TokenAuthentication,)

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = (AllowAny,)
    authentication_classes = (TokenAuthentication,)

class AnunciosOrganizacionViewSet(viewsets.ModelViewSet):
    queryset = AnunciosOrganizacion.objects.all()
    serializer_class = AnunciosOrganizacionSerializer
    permission_classes = (AllowAny,)
    filter_backends = [DjangoFilterBackend]
    filter_fields = ('id','org','creador')
    authentication_classes = (TokenAuthentication,)

class AnunciosGrupoViewSet(viewsets.ModelViewSet):
    queryset = AnunciosGrupo.objects.all()
    serializer_class = AnunciosGrupoSerializer
    permission_classes = (AllowAny,)
    filter_backends = [DjangoFilterBackend]
    filter_fields = ('id','grupo','creador')
    authentication_classes = (TokenAuthentication,)

class AnunciosGrupoOrganizacionViewSet(viewsets.ModelViewSet):
    queryset = AnunciosGrupoOrganizacion.objects.all()
    serializer_class = AnunciosGrupoOrganizacionSerializer
    permission_classes = (AllowAny,)
    filter_backends = [DjangoFilterBackend]
    filter_fields = ('id','grupo','creador')
    authentication_classes = (TokenAuthentication,)