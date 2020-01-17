from rest_framework import serializers
from .models import File

class FileSerializer(serializers.ModelSerializer):

    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = File
        fields = ('name', 'content', 'user')
