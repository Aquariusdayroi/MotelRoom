from rest_framework import serializers
from district.models import District
from city.api.serializers import CitySerializer
from city.models import City


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ['id', 'name_district']
    
class DistrictDetailSerializer(serializers.ModelSerializer):
    city_id = serializers.IntegerField(source='city.id', read_only=True)
    city_name = serializers.CharField(source='city.name_city', read_only=True)

    class Meta:
        model = District
        fields = ['id', 'name_district', 'city_id', 'city_name']
