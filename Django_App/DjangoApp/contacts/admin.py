from django.contrib import admin
from .models import MyContact
# Register your models here.
class MyContactAdmin(admin.ModelAdmin):
    list_display=['name','phone','photo','user']
admin.site.register(MyContact,MyContactAdmin)