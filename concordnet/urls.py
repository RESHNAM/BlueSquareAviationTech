"""
URL configuration for concordnet project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from apps.users.forms import CustomLoginForm  # or your app name
from apps.users.views import register_view


urlpatterns = [
    path('', include(('home.urls', 'home'), namespace='home')),
    path("admin/", admin.site.urls),
    path("admin_argon/", include('admin_argon.urls')),

    path(
        "login/",
        auth_views.LoginView.as_view(
            template_name='auth/login.html',
            authentication_form=CustomLoginForm
        ),
        name='login'
    ),
    path("register/", register_view, name="register"),
    path(
        "shop/",
        include(
            ("apps.products.urls", "apps.products"),
            namespace="shop"
        )
    ),

]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Blue Technology Admin"
admin.site.site_title = "Blue Technology Admin Portal"
admin.site.index_title = "Welcome to the Blue Technology Portal"
