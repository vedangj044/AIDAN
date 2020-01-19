from rest_framework.views import APIView
from rest_framework.response import Response
from . import visual_helper as help

class VisualEndpoint(APIView):

    @classmethod
    def get_extra_actions(cls):
        return []

class passenger(VisualEndpoint):

    def get(self, request):
        return Response(help.chart1())

class horizon(VisualEndpoint):

    def get(self, request):
        return Response(help.chart2().to_dict())

class heatmap(VisualEndpoint):

    def get(self, request):
        return Response(help.chart3().to_dict())
