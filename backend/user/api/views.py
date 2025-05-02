from django.shortcuts import render, redirect
from django.contrib.auth import logout, get_user_model

from rest_framework import generics, serializers, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from user.models import User
from .serializers import UserSerializer, RegisterSerializer, CustomTokenObtainPairSerializer, GoogleLoginSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from datetime import datetime

#JWT Token
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import AuthenticationFailed

#Gmail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth import get_user_model

# Api Lấy Danh sách user và tạo user
class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]  # Chỉ admin mới được xài api này

#---------------------------------------------------------------------------------------------------#
# Api Xem Chi tiết, cập nhật, xóa user
class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Chỉ cần đăng nhập


#---------------------------------------------------------------------------------------------------#
# Api Đăng nhập
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def handle_exception(self, exc):
        if isinstance(exc, AuthenticationFailed):
            return Response({
                "success": False,
                "message": "Đăng nhập thất bại. Tài khoản hoặc mật khẩu không đúng."
            }, status=status.HTTP_401_UNAUTHORIZED)
        return super().handle_exception(exc)



#---------------------------------------------------------------------------------------------------#
# Api xác thực email
class VerifyEmailView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = get_user_model().objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            
            user.email_verified_at = datetime.now()
            user.save()
            return Response({"success": True, "message": "Xác minh email thành công."})
        else:
            return Response({"success": False, "message": "Liên kết xác minh không hợp lệ hoặc đã hết hạn."}, status=400)

#---------------------------------------------------------------------------------------------------#
#Api Đăng ký
class RegisterAPIView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny] #Bất kỳ ai

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                "success": False,
                "message": "Đăng ký thất bại.",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        return Response({
            "success": True,
            "message": "Đăng ký thành công.",
            "user": self.get_serializer(user).data
        }, status=status.HTTP_201_CREATED)
    


#---------------------------------------------------------------------------------------------------#
#Api Đăng nhập bằng google 
class GoogleLoginView(APIView):
    def post(self, request):
        serializer = GoogleLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response({
            "success": False,
            "message": "Đăng nhập bằng Google thất bại.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


