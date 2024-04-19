# AHPcalculator/urls.py
from django.urls import path
from .views import CalculateWeightsView

urlpatterns = [
    path('weights/', CalculateWeightsView.as_view(), name='calculate-weights'),  # Remove 'api/' prefix here
]
