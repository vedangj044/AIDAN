from django.conf.urls import url
from .visual import passenger, horizon, heatmap, pieChart

urlpatterns = [
    url("passenger", passenger.as_view(), name='visual'),
    url("horizon", horizon.as_view()),
    url("heatmap", heatmap.as_view()),
    url("pieChart", pieChart.as_view())
]
