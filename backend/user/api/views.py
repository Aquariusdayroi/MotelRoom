from django.shortcuts import render, redirect
from django.contrib.auth import logout
from rest_framework import generics, serializers, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from user.models import User
from .serializers import UserSerializer, RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny


#JWT Token
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import AuthenticationFailed



def home(request): 
    return render(request, "home.html")



def logout_view(request): 
    logout(request)
    return redirect("/")

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
#Api Test

