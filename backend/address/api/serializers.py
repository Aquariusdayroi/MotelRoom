from rest_framework import serializers
from address.models import Address
from city.api.serializers import CitySerializer
from district.api.serializers import DistrictSerializer
from city.models import City
from district.models import District
class AddressSerializer(serializers.ModelSerializer):
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())
    district = serializers.PrimaryKeyRelatedField(queryset=District.objects.all())

    class Meta:
        model = Address
        fields = [
            'id',
            'description',
            'latitude',
            'longitude',
            'city',
            'district',
        ]
    
    
