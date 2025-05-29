#Serialzier
from rest_framework import serializers

#Django
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import update_last_login
from django.contrib.auth import get_user_model

#Model
from city.models import City
from district.models import District
from address.models import Address
from user.models import User, OwnerRequest, OwnerRequestImage

#JWT token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

#Exception
from rest_framework.exceptions import ValidationError

#Google
from google.oauth2 import id_token
from google.auth.transport import requests

#Address
from address.api.serializers import AddressNestedSerializer
from address.models import Address

#Token Gmail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

#Send Gmail
from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings

#Time delay
import time






#---------------------------------------------------------------------------------------------------#
#Xác thực mail 
def send_verification_email(user, request):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    verify_url = request.build_absolute_uri(
        reverse('verify-email', kwargs={'uidb64': uid, 'token': token})
    )

    html_message = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Xác minh Email</title>
    <style>
    .button {{
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 14px 28px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 20px 0;
        cursor: pointer;
        border-radius: 8px;
    }}
    .container {{
        max-width: 500px;
        margin: auto;
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        font-family: Arial, sans-serif;
    }}
    .footer {{
        margin-top: 30px;
        font-size: 12px;
        color: #888;
        text-align: center;
    }}
    </style>
</head>
<body style="background: #f4f4f4;">
    <div class="container">
    <h2>Chào mừng bạn đến với MotelRoom!</h2>
    <p>Cảm ơn bạn đã đăng ký tài khoản.<br>
    Vui lòng nhấn vào nút bên dưới để xác minh email.</p>
    <a href="{verify_url}" class="button">Xác minh Email</a>
    <div class="footer">
        Nếu bạn không thực hiện hành động này, vui lòng bỏ qua email này.<br>
        &copy; 2024 MotelRoom
    </div>
    </div>
</body>
</html>
"""

    send_mail(
        subject='Xác minh email tài khoản của bạn',
        message = 'Xác minh email tài khoản của bạn',
        html_message=html_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )

#---------------------------------------------------------------------------------------------------#
#Serializer Đăng nhập
class UserSerializer(serializers.ModelSerializer):
    address = AddressNestedSerializer()
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'fullname', 'phone_number', 'birthday', 'avatar', 'address', 'role'
        ]

        read_only_fields = ['id', 'created', 'updated_at', 'is_active', 'registration_type', 'email_verified_at']

#---------------------------------------------------------------------------------------------------#
#Serial xác thực người dùng
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        User = get_user_model()
        time.sleep(1)
        try:
            user = User.objects.get(
                email = attrs["email"]
            )
        except User.DoesNotExist:
            raise AuthenticationFailed("Email hoặc mật khẩu không đúng.")
        
        if not user.check_password(attrs["password"]):
            raise AuthenticationFailed("Email hoặc mật khẩu không đúng.")
        if not user.is_active:
            raise AuthenticationFailed("Tài khoản chưa xác thực Email.")
        
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
        for attempt in range(3):
            try:
                # Verify the token with Google
                idinfo = id_token.verify_oauth2_token(
                    attrs['token'], 
                    requests.Request(), 
                    audience=None  # có thể truyền client_id nếu cần kiểm tra cụ thể
                )
                break
            except ValueError as e:
                if attempt == 0:
                    print("Xác thực token Google thất bại, thử lại sau 1 giây:", e)
                    time.sleep(1)
                else:
                    print("Lỗi xác thực token Google:", e)
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

#---------------------------------------------------------------------------------------------------#
# Serializer ảnh bài đăng trọ khi người dùng đăng ký thành owner
class OwnerRequestImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnerRequestImage
        fields = ['image']


#---------------------------------------------------------------------------------------------------#
# Serializer người dùng đăng ký thành owner
class OwnerRequestSerializer(serializers.ModelSerializer):
    images_rental_post = OwnerRequestImageSerializer(many=True, write_only=True, required=False)

    class Meta:
        model = OwnerRequest 
        fields = ['rental_post_data', 'cccd', 'image_front_cccd', 'image_back_cccd', 'images_rental_post']
        
    def validate(self, attrs):
        user = self.context['request'].user
        
        if hasattr(user, 'ownerrequest'):
            if user.ownerrequest.status == 'pending':
                raise serializers.ValidationError('Yêu cầu của bạn đang được xử lý.')
            elif user.ownerrequest.status == 'approved':
                raise serializers.ValidationError('Bạn đã là chủ phòng.')
            elif user.ownerrequest.status == 'rejected':
                raise serializers.ValidationError('Yêu cầu đã bị từ chối.')
        
        # Lấy giá trị rental_post_data từ dữ liệu request
        rental_post_data = attrs.get('rental_post_data')
        images_rental_post = attrs.get('images_rental_post')
        # print(attrs.get('image_front_cccd'))
        if not images_rental_post: 
            raise serializers.ValidationError({'Image RentalPost': 'Không được để trống'})
        # Kiểm tra rental_post_data có tồn tại và hợp lệ không
                # Kiểm tra từng field bắt buộc
        if not rental_post_data.get('title'):
            raise serializers.ValidationError({'title': 'Tiêu đề bài đăng không được để trống.'})
        if not rental_post_data.get('information_detail'):
            raise serializers.ValidationError({'information_detail': 'Mô tả chi tiết không được để trống.'})
        if not rental_post_data.get('home_type'):
            raise serializers.ValidationError({'home_type': 'Loại phòng không được để trống.'})
        
        if not rental_post_data.get('address'):
            raise serializers.ValidationError({'address': 'Địa chỉ không được để trống.'})
        else: 
            address = rental_post_data.get('address', {})
            if not address.get('city'): 
                raise serializers.ValidationError({'address': 'Thành phố không được để trống'})
            if not address.get('district'): 
                raise serializers.ValidationError({'address': 'Quận huyện không được để trống'})
            if not address.get('description'): 
                raise serializers.ValidationError({'address': 'Địa chỉ chi tiết không được để trống'})
            if not address.get('latitude'): 
                raise serializers.ValidationError({'address': 'Địa chỉ không có vĩ độ'})
            if not address.get('longitude'): 
                raise serializers.ValidationError({'address': 'Địa chỉ không có kinh độ'})
            
        if not rental_post_data.get('total_occupancy'):
            raise serializers.ValidationError({'total_occupancy': 'Sức chứa không được để trống.'})
        if not rental_post_data.get('acreage'):
            raise serializers.ValidationError({'acreage': 'Diện tích không được để trống.'})
        if not rental_post_data.get('price'):
            raise serializers.ValidationError({'price': 'Giá phòng không được để trống.'})

        return attrs
    
    def create(self, validated_data):
        images_rental_post = validated_data.pop('images_rental_post', [])
        rental_post_data = validated_data.pop('rental_post_data')
        owner_request = OwnerRequest.objects.create(
            user=self.context['request'].user,
            rental_post_data=rental_post_data,
            **validated_data
        )
        for img in images_rental_post:
            OwnerRequestImage.objects.create(owner_request=owner_request, **img)
        return owner_request

#---------------------------------------------------------------------------------------------------#   
# Serializer admin xem danh sách các yêu cầu
class OwnerRequestAdminSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email')
    fullname = serializers.CharField(source='user.fullname')
    phone_number = serializers.CharField(source='user.phone_number')
    images_rental_post = OwnerRequestImageSerializer(many=True, read_only=True)
    class Meta:
        model = OwnerRequest
        fields = ['id', 'email', 'fullname', 'phone_number', 'cccd', 'image_front_cccd',
                  'image_back_cccd', 'status', 'reviewed_at', 'rejection_reason', 'rental_post_data', 'images_rental_post']
    def validate_user(self, value):
        if OwnerRequest.objects.filter(user=value).exists():
            raise serializers.ValidationError("Bạn đã gửi yêu cầu trước đó.")
        return value


#---------------------------------------------------------------------------------------------------#
# Serializer sửa thông tin người dùng
class UpdateUserSerializer(serializers.ModelSerializer):
    address = AddressNestedSerializer()

    class Meta:
        model = User
        fields = [
            'id', 'fullname', 'phone_number', 'birthday', 'avatar', 'address', 'role'
        ]

    def update(self, instance, validated_data):
        address_data = validated_data.pop("address", None)

        # Update các trường cơ bản
        for attr, value in validated_data.items():
            if value == None: continue
            if value =="":
                setattr(instance, attr, None)
            else:
                setattr(instance, attr, value)

        # Cập nhật địa chỉ nếu có
        if address_data:
            address_serializer = AddressNestedSerializer()
            address = address_serializer.create_or_update_address(address_data)
            instance.address = address

        instance.save()
        return instance

#---------------------------------------------------------------------------------------------------#
# Gửi OPT Reset Password
def send_OPT_Reset_Password(user, request):    
    otp = cache.get('otp')
    if not otp:
        otp = random.randint(10000, 99999) 
        cache.set('otp', otp, timeout=300)  
    send_mail(
        subject='Khôi phục mật khẩu tài khoản của bạn',
        message=f'Mã OTP khôi phục mật khẩu của bạn là: \n{otp} \nMã có hiệu lực trong 5 phút, vui lòng không chia sẻ mã này với bất kỳ ai.',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )

#---------------------------------------------------------------------------------------------------#
# Xác thực OTP Reset Password
def check_OTP_Reset_Password(user, otp):
    cached_otp = cache.get('otp')
    if not cached_otp:
        raise ValidationError("Mã OTP đã hết hạn hoặc không hợp lệ.")
    
    if str(cached_otp) != str(otp):
        raise ValidationError("Mã OTP không đúng.")
    
    return True
