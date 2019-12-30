"""DjangoApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from users import views as users_views
from contacts import views
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views



urlpatterns = [
    path('admin/', admin.site.urls),
    
    re_path(r'^login/$', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    re_path(r'^logout/$', auth_views.LogoutView.as_view(), name='logout'),
    path('signup/',users_views.SignUpView,name='signup'),
    re_path(r'^login/home/$',views.ContactView,name='home'),
    path('NewContact/',views.create_Contact,name='create'),
    # re_path(r'^home/(?P<pk>\d+)/$',views.PersonView,name='person'),
    re_path(r'^login/home/(?P<pk>\d+)/edit/$',views.contact_edit,name='edit'),
    path('',TemplateView.as_view(template_name='base.html'),name='base'),
    re_path(r'^login/home/(?P<pk>\d+)/confirm_delete/$',views.contact_delete,name='delete'),

]
