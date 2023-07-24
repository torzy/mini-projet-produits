from rest_framework import serializers
from .models import produit

class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = produit
        fields = ('produitId',
                  'Nom',
                  'PrixUnitaire',
                  'Quantite',)
