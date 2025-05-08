from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status, serializers
from city.models import City
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from city.api.serializers import citySerializer, CityDetailSerializer

# Create your views here.

#--------------------------------------#
# API xem, thêm thành phố

class CityListCreateAPIView(ListCreateAPIView):
    serializer_class = citySerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    serializer_class = citySerializer

    def get(self, request):
        try:
            cities = City.objects.all()
            serializer = self.serializer_class(cities, many=True)
            return Response(serializer.data, status=200)
        except Exception as e:
            return Response(
                {"error": "Đã xảy ra lỗi khi lấy danh sách thành phố.", "details": str(e)},
                status=500
            )
    
    def post(self, request):
        serializer = citySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            city = serializer.save()  # nên dùng save nếu có ModelSerializer
            return Response({
                "message": "Thành phố đã được thêm thành công.",
                "id": city.id,
                "city": city.name_city
            }, status=201)
        return Response(serializer.errors, status=400)

#--------------------------------------#
# API xem, cập nhật, xóa thành phố theo id

class CityDetailRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CityDetailSerializer
    lookup_field = 'id'

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, *args, **kwargs):
        try:
            city = self.get_object()  
            serializer = self.get_serializer(city) 
            return Response({
                "message": "Lấy thông tin thành phố thành công!",
                "data": serializer.data
            }, status=status.HTTP_200_OK)

        except City.DoesNotExist:
            return Response({"error": "Không tìm thấy thành phố."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({
                "error": str(e) or "Đã xảy ra lỗi khi lấy thông tin thành phố."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
    def patch(self, request, *args, **kwargs):
        try:
            city = self.get_object()
            serializer = self.get_serializer(city, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response({
                "message": "Cập nhật thành phố thành công!",
                "data": serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                "error": str(e) or "Có lỗi xảy ra khi cập nhật thành phố."
            }, status=status.HTTP_400_BAD_REQUEST)
            
    def put(self, request, *args, **kwargs):
        try:
            city = self.get_object()
            serializer = self.get_serializer(city, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response({
                "message": "Cập nhật thành phố thành công!",
                "data": serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                "error": str(e) or "Có lỗi xảy ra khi cập nhật thành phố."
            }, status=status.HTTP_400_BAD_REQUEST)
            
    def delete(self, request, *args, **kwargs):
        try:
            city = self.get_object()
            city.delete()
            return Response({
                "message": "Xóa thành phố thành công!",
            }, status=status.HTTP_204_NO_CONTENT)
        except serializers.ValidationError as e:
            return Response({"error": str(e)}, status=400)
        except Exception as e:
            return Response({"error": "Đã xảy ra lỗi khi xóa thành phố."}, status=500)
    