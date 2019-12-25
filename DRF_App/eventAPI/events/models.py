from django.db import models

# Create your models here.
class eventdetails(models.Model):
    name = models.CharField(max_length=200)
    place = models.CharField(max_length=100)
    time = models.DateTimeField()
