from django.db import models

# Create your models here.

class produit(models.Model):
    produitId = models.AutoField(primary_key=True)
    Nom = models.CharField(max_length=100)
    PrixUnitaire = models.FloatField()
    Quantite = models.IntegerField()
