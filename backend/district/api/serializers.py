from rest_framework import serializers
from district.models import District
from city.api.serializers import CitySerializer
from city.models import City


class DistrictSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)

    class Meta:
        model = District
        fields = ['id', 'name_district', 'city']