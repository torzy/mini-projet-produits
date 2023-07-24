from django.urls import path

from .views import ProduitView

urlpatterns = [
    path('produits/', ProduitView.as_view()),
    path('produits', ProduitView.as_view()),
    path('produits/<int:pk>/', ProduitView.as_view())
]
