from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import FileSerializer
from .models import File
from django.core.files.base import ContentFile

class FileUploadView(APIView):

    def post(self, request, *args, **kwargs):

        query = request.data.dict()['name']

        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            f = File.objects.filter(name=query)
            if len(f)>0:
                f[0].content = request.data.dict()['content']
                f[0].save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
