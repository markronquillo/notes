"""blueblog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include
from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth.views import login, logout
from accounts.views import UserRegistrationView
from blog.views import (
    NewBlogView, 
    HomeView, 
    UpdateBlogView, 
    NewBlogPostView
)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', HomeView.as_view(), name='home'),
    url(r'^login/$', login, {'template_name': 'login.html'}, name='login'),
    url(r'^logout/$', logout, {'next_page': '/login/'}, name='logout'),
    url(r'^new-user/$', UserRegistrationView.as_view(), 
        name="user_registration"),

    url(r'blog/new/$', NewBlogView.as_view(), name='new-blog'),
    url(r'blog/(?P<pk>\d+)/update/$', UpdateBlogView.as_view(), name='update-blog'),
    url(r'blog/post/new/$', NewBlogPostView.as_view(), name='new-blog-post'),
]
