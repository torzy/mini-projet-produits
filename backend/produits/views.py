from django.http.response import Http404
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import produit
from .serializers import ProduitSerializer


# Create your views here.

class ProduitView(APIView):
    def post(self, request):
        data = request.data
        serializer = ProduitSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Produit Added Successfully", safe=False)
        return JsonResponse("Failed to Add Produit", safe=False)

    def get_produit(self, pk):
        try:
            p = produit.objects.get(produitId=pk)
            return p
        except produit.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        search = request.GET.get('search')
        if search:
            data = produit.objects.filter(Nom__icontains=search) | produit.objects.filter(
                PrixUnitaire__icontains=search) | produit.objects.filter(Quantite__icontains=search)
            serializer = ProduitSerializer(data, many=True)
            return Response(serializer.data)
        elif pk:
            data = self.get_produit(pk)
            serializer = ProduitSerializer(data)
        else:
            data = produit.objects.all()
            serializer = ProduitSerializer(data, many=True)
        return Response(serializer.data)

    def put(self, request, pk=None):
        produit_to_update = produit.objects.get(produitId=pk)
        serializer = ProduitSerializer(instance=produit_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Produit updated Successfully", safe=False)
        return JsonResponse("Failed To Update Produit")

    def delete(self, request, pk):
        produit_to_delete = produit.objects.get(produitId=pk)
        produit_to_delete.delete()
        return JsonResponse("Produit Deleted Successfully", safe=False)

