from rest_framework import routers
from . import views as my_views


router = routers.DefaultRouter()
router.register(r'load', my_views.LoadDashboard, basename='user')
