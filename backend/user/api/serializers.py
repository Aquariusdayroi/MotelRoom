from rest_framework import serializers
from user.models import User, OwnerRequest
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import update_last_login
from django.contrib.auth import get_user_model

#JWT token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

#Google
from google.oauth2 import id_token
from google.auth.transport import requests



#Token Gmail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

#Send Gmail
from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings

#Xác thực mail 
def send_verification_email(user, request):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    verify_url = request.build_absolute_uri(
        reverse('verify-email', kwargs={'uidb64': uid, 'token': token})
    )

    send_mail(
        subject='Xác minh email tài khoản của bạn',
        message=f'Vui lòng nhấn vào liên kết sau để xác minh email:\n{verify_url}',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )


#Serializer Đăng nhập
class UserSerializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='address.name_city', read_only=True, default=None)
    district_name = serializers.CharField(source='addres.name_district', read_only=True, default=None)
    address_name = serializers.CharField(source='addres.name_address', read_only=True, default=None)
    class Meta:
        model = User
        fields = [
            'id',
            'email', 'fullname', 'phone_number',
            'address_name', 'district_name', 'city_name',
            'avatar', 'birthday', 'role'
        ]
        read_only_fields = ['id', 'created', 'updated_at', 'is_active', 'registration_type', 'email_verified_at']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        User = get_user_model()
        try:
            user = User.objects.get(
                email = attrs["email"]
            )
        except User.DoesNotExist:
            raise AuthenticationFailed("Email hoặc mật khẩu không đúng.")
        
        if not user.check_password(attrs["password"]):
            raise AuthenticationFailed("Email hoặc mật khẩu không đúng.")
        if not user.is_active:
            raise AuthenticationFailed("Tài khoản chưa xác thực Email")
        
        refresh = self.get_token(user)
        return {
            "success": True,
            "message": "Đăng nhập thành công.",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "user_id": user.id,
                "email": user.email,
                "fullname": user.fullname,
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
        fields = ['email', 'fullname', 'password', 'password2']

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
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            fullname=validated_data['fullname'],
            role='user'
        )
        user.is_active = False  # Chưa active cho đến khi xác minh
        user.save()

        request = self.context.get('request')
        send_verification_email(user, request)
        return user

#---------------------------------------------------------------------------------------------------#
#Serializer Đăng nhập bằng google
class GoogleLoginSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate(self, attrs):
        idinfo = None
        try:
            # Verify the token with Google
            idinfo = id_token.verify_oauth2_token(
                attrs['token'], 
                requests.Request(), 
                audience=None  # có thể truyền client_id nếu cần kiểm tra cụ thể
            )
        except ValueError:
            raise serializers.ValidationError("Token Google không hợp lệ.")

        # Extract user info from token
        email = idinfo.get("email")
        fullname = idinfo.get("name", "")
        google_id = idinfo.get("sub")  # Unique Google User ID

        if not email:
            raise serializers.ValidationError("Không thể lấy thông tin email từ token.")

        # Tìm hoặc tạo user
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "fullname": fullname,
                "google_id": google_id,
                "registration_type": "google",
                "is_active": True
            }
        )

        # Nếu user tồn tại nhưng chưa có google_id, thì cập nhật
        if not user.google_id:
            user.google_id = google_id
            user.save()

        # Tạo token đăng nhập
        refresh = RefreshToken.for_user(user)

        return {
            "success": True,
            "message": "Đăng nhập bằng Google thành công.",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "user_id": user.id,
                "email": user.email,
                "fullname": user.fullname,
                "role": user.role
            }
        }

class OwnerRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnerRequest
        fields = ['id', 'user', 'cccd', 'image_front_cccd', 'image_back_cccd', 'status', 'rejection_reason', 'created_at', 'reviewed_at']
        read_only_fields = ['user', 'status', 'rejection_reason', 'created_at', 'reviewed_at']

    def validate_user(self, value):
        if OwnerRequest.objects.filter(user=value).exists():
            raise serializers.ValidationError("Bạn đã gửi yêu cầu trước đó.")
        return value