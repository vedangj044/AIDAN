from rest_framework import routers
from events import api_views as my_views
from events import visual

router = routers.DefaultRouter()
router.register(r'events', my_views.EventViewsets, basename='user')
router.register(r'visual', visual.VisualEndpoint, basename="visual")
