from rest_framework.generics import ListAPIView, RetrieveAPIView
from district.models import District
from .serializers import DistrictSerializer, DistrictDetailSerializer

class DistrictListAPIView(ListAPIView):
    queryset = District.objects.select_related('city').all()
    serializer_class = DistrictSerializer

class DistrictDetailAPIView(RetrieveAPIView):
    queryset = District.objects.select_related('city').all()
    serializer_class = DistrictDetailSerializer
    lookup_field = 'id'

class DistrictByCityAPIView(ListAPIView):
    serializer_class = DistrictSerializer
    pagination_class = None
    
    def get_queryset(self):
        city_id = self.kwargs.get('city_id')
        return District.objects.select_related('city').filter(city__id=city_id)
