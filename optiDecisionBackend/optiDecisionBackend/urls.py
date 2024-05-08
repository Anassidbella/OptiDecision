# optiDecisionBackend/urls.py
from django.contrib import admin
from django.urls import include, path
from . import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('AHPcalculator.urls')),
        path('signup/', views.signup, name='signup'),

]
