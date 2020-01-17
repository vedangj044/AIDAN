from django.db import models
from django.core.files.base import ContentFile
from django.contrib.auth.models import User


class File(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True, null=False)
    file = models.FileField(blank=False, null=False)
    content = models.CharField(max_length=100)

    def __str__(self):
        return self.file.name

    def save(self, *args, **kwargs):

        self.file.save(self.name, ContentFile(self.content), save=False)
        super(File,self).save(*args, **kwargs)
