from rest_framework import serializers
from rental_post.models import RentalPost
from city.api.serializers import CitySerializer
from district.models import District
from district.api.serializers import DistrictSerializer
from city.models import City
from address.models import Address
from address.api.serializers import AddressSerializer

from rest_framework import serializers
from rental_post.models import RentalPost
from address.api.serializers import AddressSerializer

class RentalPostSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = RentalPost
        fields = [
            'id', 'user', 'home_type', 'title', 'information_detail',
            'address', 'total_occupancy', 'acreage', 'price', 
            'create_at', 'update_at', 'has_toilet', 'private_rental',
            'has_washing', 'curfew_time'
        ]
        read_only_fields = ('user', 'create_at', 'update_at')
        
    def create(self, validated_data):
        address_data = validated_data.pop('address')
        address = Address.objects.create(**address_data)
        rental_post = RentalPost.objects.create(address=address, **validated_data)
        return rental_post
    
    def update(self, instance, validated_data):
        address_data = validated_data.pop('address', None)

        # Cập nhật các trường cơ bản của RentalPost
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Cập nhật địa chỉ nếu có
        if address_data:
            address = instance.address
            if address:
                for attr, value in address_data.items():
                    setattr(address, attr, value)
                address.save()
            else:
                address = Address.objects.create(**address_data)
                instance.address = address

        instance.save()
        return instance

