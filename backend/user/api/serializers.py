from rest_framework import serializers
from user.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import update_last_login

#JWT token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import AuthenticationFailed

#Serializer Đăng nhập
class UserSerializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.name_city', read_only=True, default=None)
    district_name = serializers.CharField(source='district.name_district', read_only=True, default=None)
    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'phone_number',
            'detail_address', 'city_name', 'district_name',
            'avatar', 'image_front_ccd', 'image_after_cccd', 'birthday',
            'created', 'updated_at', 'role', 'is_active'
        ]
        read_only_fields = ['created', 'updated_at']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user
        return {
            "success": True,
            "message": "Đăng nhập thành công.",
            "access": data['access'],
            "refresh": data['refresh'],
            "user": {
                "user_id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "role": user.role
            }
        }


#---------------------------------------------------------------------------------------------------#
#Serializer Đăng Ký

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)  # đảm bảo định dạng email hợp lệ

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'role', 'password', 'password2']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email đã tồn tại.")
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Mật khẩu không khớp."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user
#---------------------------------------------------------------------------------------------------#