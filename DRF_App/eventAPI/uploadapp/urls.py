from django.conf.urls import url, include
from .views import *
from .api import router

urlpatterns = [
    url('save', FileUploadView.as_view()),
    url('v1/', include(router.urls)),
]
