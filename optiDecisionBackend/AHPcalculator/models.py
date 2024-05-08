from django.db import models

# Dans AHPcalculator/models.py

from django.db import models

class CustomUser(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)  # Il est recommandé d'utiliser un hachage de mot de passe

