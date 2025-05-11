from rest_framework.generics import ListAPIView, RetrieveAPIView
from city.models import City
from .serializers import CitySerializer

# API lấy danh sách thành phố
class CityListAPIView(ListAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    
# API lấy chi tiết thành phố
class CityDetailAPIView(RetrieveAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    lookup_field = 'id'
