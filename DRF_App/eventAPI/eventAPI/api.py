from rest_framework import routers
from events import api_views as my_views

router = routers.DefaultRouter()
router.register(r'events', my_views.EventViewsets, basename='user')
