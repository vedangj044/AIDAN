from rest_framework import viewsets
from . import models
from . import serializers
from rest_framework.permissions import IsAuthenticated

class EventViewsets(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]
    serializer_class = serializers.EventSerializer

    def get_queryset(self):
        user = self.request.user.id
        queryset = models.eventdetails.objects.filter(user=user)

        return queryset
