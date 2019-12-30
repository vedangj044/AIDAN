from rest_framework import serializers
from . import models

class EventSerializer(serializers.ModelSerializer):

    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = models.eventdetails
        fields = ('id', 'user', 'name', 'place', 'time')
