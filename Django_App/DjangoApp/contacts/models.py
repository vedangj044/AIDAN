from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.
class MyContact(models.Model):
    name = models.CharField(max_length=80)
    phone = PhoneNumberField(unique=True)
    photo = models.ImageField(blank=True,
                              upload_to='myproject/DjangoApp/static/img/')
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='mycontacts',
        null=True)
