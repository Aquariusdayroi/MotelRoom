from rest_framework import serializers
from address.models import Address
from city.api.serializers import CitySerializer
from district.api.serializers import DistrictSerializer
from city.models import City
from district.models import District
# class AddressSerializer(serializers.ModelSerializer):
#     city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())
#     district = serializers.PrimaryKeyRelatedField(queryset=District.objects.all())

#     class Meta:
#         model = Address
#         fields = [
#             'id',
#             'description',
#             'latitude',
#             'longitude',
#             'city',
#             'district',
#         ]
class AddressSerializer(serializers.ModelSerializer):
    city_name = serializers.CharField(write_only=True)  # Nhận tên của thành phố
    district_name = serializers.CharField(write_only=True)  # Nhận tên của quận
    
    city = serializers.SlugRelatedField(queryset=City.objects.all(), slug_field='name_city', write_only=True)
    district = serializers.SlugRelatedField(queryset=District.objects.all(), slug_field='name_district', write_only=True)

    class Meta:
        model = Address
        fields = ['id', 'description', 'latitude', 'longitude', 'city', 'district', 'city_name', 'district_name']
        
class AddressNestedSerializer(serializers.ModelSerializer):
    address_name = serializers.CharField(source='description')

    # Input
    district_name = serializers.CharField(write_only=True)
    city_name = serializers.CharField(write_only=True)

    # Output: override lại bằng SerializerMethodField nhưng dùng chung tên
    district_name_display = serializers.SerializerMethodField()
    city_name_display = serializers.SerializerMethodField()

    class Meta:
        model = Address
        fields = [
            'id',
            'address_name',
            'district_name',       # input
            'city_name',           # input
            'district_name_display',  # output
            'city_name_display',      # output
        ]

    def get_district_name_display(self, obj):
        return obj.district.name_district if obj.district else None

    def get_city_name_display(self, obj):
        return obj.city.name_city if obj.city else None

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Đổi tên trường trả về
        data['district_name'] = data.pop('district_name_display')
        data['city_name'] = data.pop('city_name_display')
        return data

    def create_or_update_address(self, validated_data):
        description = validated_data.get("description")
        district_name = validated_data.pop("district_name", None)
        city_name = validated_data.pop("city_name", None)

        try:
            city = City.objects.get(name_city=city_name)
        except City.DoesNotExist:
            raise serializers.ValidationError({"city_name": "Không tồn tại thành phố này."})

        try:
            district = District.objects.get(name_district=district_name, city=city)
        except District.DoesNotExist:
            raise serializers.ValidationError({"district_name": "Không tồn tại quận/huyện này trong thành phố đã chọn."})

        address, _ = Address.objects.get_or_create(description=description)
        address.city = city
        address.district = district
        address.save()

        return address


