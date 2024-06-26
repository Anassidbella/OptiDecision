# optiDecisionBackend/urls.py
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView ,TokenBlacklistView)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('AHPcalculator.urls')),
    path('api/token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh',TokenRefreshView.as_view(),name='token_refresh'),
    path('api/logout/', TokenBlacklistView.as_view(), name='logout'), 
]
