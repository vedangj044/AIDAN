from rest_framework import viewsets
from . import models
from . import serializers

class EventViewsets(viewsets.ModelViewSet):
    queryset = models.eventdetails.objects.all()
    serializer_class = serializers.EventSerializer
