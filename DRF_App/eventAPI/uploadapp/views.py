from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import authentication, permissions
from rest_framework import status
from .serializers import FileSerializer
from .models import File
from django.core.files.base import ContentFile


class FileUploadView(APIView):

    authentication_classes = [authentication.SessionAuthentication]

    def get(self, request, *args, **kwargs):

        query = request.data.dict()['name']

        serializer = FileSerializer(data=request.data, context={'request': request})
        if request.user.is_superuser:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                f = File.objects.filter(name=query)
                if len(f)>0:
                    f[0].content = request.data.dict()['content']
                    f[0].save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)

        if request.user.is_staff:
            serializer.is_valid()
            f = File.objects.filter(name=query)
            if len(f)>0:
                f[0].content = request.data.dict()['content']
                f[0].save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response("{'Message': 'Login not found'}", status=status.HTTP_400_BAD_REQUEST)
