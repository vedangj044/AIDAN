from django.conf.urls import url
from .visual import passenger

urlpatterns = [
    url("passenger", passenger.as_view(), name='visual')
]
