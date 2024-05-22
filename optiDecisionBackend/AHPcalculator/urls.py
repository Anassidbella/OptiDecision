# AHPcalculator/urls.py
from django.urls import path
from .views import CalculateWeightsView,TOPSISView,RegisterUserView
urlpatterns = [
    path('weights/', CalculateWeightsView.as_view(), name='calculate-weights'),  
    path('topsis/', TOPSISView.as_view(), name='topsis-analysis'),  
    path('api/register/', RegisterUserView.as_view(), name='register_user'),
    
]
