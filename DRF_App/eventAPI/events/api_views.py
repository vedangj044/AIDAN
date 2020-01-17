from rest_framework import viewsets
from .models import eventdetails
from . import serializers
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated

class EventViewsets(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]
    serializer_class = serializers.EventSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        user = self.request.user.id
        queryset = eventdetails.objects.filter(user=user)

        place = self.request.query_params.get('place', None)
        if place is not None:
            queryset = eventdetails.objects.filter(user=user,place=place)
        return queryset
