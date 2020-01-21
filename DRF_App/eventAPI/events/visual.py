from rest_framework.views import APIView
from rest_framework.response import Response
from . import visual_helper as help

class VisualEndpoint(APIView):

    @classmethod
    def get_extra_actions(cls):
        return []

class passenger(VisualEndpoint):

    def get(self, request):
        return Response(help.baggage_belts().to_dict())

class horizon(VisualEndpoint):

    def get(self, request):
        return Response(help.passenger_footfall().to_dict())

class heatmap(VisualEndpoint):

    def get(self, request):
        return Response(help.available_parking().to_dict())

class pieChart(VisualEndpoint):

    def get(self, request):
        return Response(help.boarding_gates())
