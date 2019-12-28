from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class eventdetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    place = models.CharField(max_length=100)
    time = models.DateTimeField()
