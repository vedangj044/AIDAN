from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import authentication, permissions
from rest_framework import status
from .serializers import FileSerializer
from .models import File
from django.core.files.base import ContentFile
import json
from django.contrib.auth.models import User

class FileUploadView(APIView):

    def post(self, request, *args, **kwargs):
        user_on = User.objects.filter(id=request.data['user'])[0]
        query = request.data['name']
        serializer = FileSerializer(data={'user': request.data['user'], 'name': request.data['name'], 'content': request.data['content']}, context={'request': request})
        if user_on.is_superuser:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                f = File.objects.filter(name=query)
                if len(f)>0:
                    f[0].content = request.data['content']
                    f[0].save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)

        if user_on.is_staff:
            serializer.is_valid()
            f = File.objects.filter(name=query)
            if len(f)>0:
                f[0].content = request.data['content']
                f[0].save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response("{'Message': 'Login not found'}", status=status.HTTP_400_BAD_REQUEST)

class LoadDashboard(viewsets.ModelViewSet):

    serializer_class = FileSerializer

    def get_queryset(self):
        if self.request.user.id:
            user = self.request.user.id
        else:
            user = 1
        queryset = File.objects.filter(user=user)

        return queryset
