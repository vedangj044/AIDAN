from rest_framework.views import APIView
from rest_framework.response import Response
from . import visual_helper as help

class VisualEndpoint(APIView):

    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request):
        return Response(help.chart.to_dict())

class passenger(VisualEndpoint):

    def get(self, request):
        return Response(help.chart.to_dict())
