from django import forms

from .models import MyContact


class NewContactForm(forms.ModelForm):
    class Meta:
        model = MyContact
        fields = ('name', 'phone', 'photo')
