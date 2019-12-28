from rest_framework import viewsets
from . import models
from . import serializers
from rest_framework.permissions import IsAuthenticated

class EventViewsets(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]
    queryset = models.eventdetails.objects.all()
    serializer_class = serializers.EventSerializer
