from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status, serializers
from district.models import District
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from district.api.serializers import DistrictSerializer, DistrictDetailSerializer

# Create your views here.
class DistrictListCreateAPIView(ListCreateAPIView):
    serializer_class = DistrictSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, city_id=None):
        try:
            districts = District.objects.filter(city__id=city_id)
            serializer = self.serializer_class(districts, many=True)
            return Response({
                "message": f"Danh sách quận/huyện thuộc thành phố có ID {city_id}",
                "data": serializer.data
            }, status=200)
        except Exception as e:
            return Response(
                {"error": "Đã xảy ra lỗi khi lấy danh sách quận huyện.", "details": str(e)},
                status=500
            )

    def post(self, request, city_id):
        try:
            # Gộp city_id vào dữ liệu gửi đi
            data = request.data.copy()
            data['city'] = city_id

            serializer = DistrictSerializer(data=data, context={'request': request})
            if serializer.is_valid():
                district = serializer.save()
                return Response({
                    "message": "Quận huyện đã được thêm thành công.",
                    "id": district.id,
                    "district": district.name_district
                }, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response(
                {"error": "Đã xảy ra lỗi khi thêm quận huyện.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    
class DistrictDetailRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = District.objects.all()
    serializer_class = DistrictDetailSerializer
    lookup_field = 'id'

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_object(self):
        # Kiểm tra city_id có khớp với district không (bảo vệ dữ liệu)
        district = super().get_object()
        city_id = self.kwargs.get("city_id")
        if city_id and district.city_id != city_id:
            raise serializers.ValidationError("Quận không thuộc thành phố đã chỉ định.")
        return district

    def get(self, request, *args, **kwargs):
        try:
            district = self.get_object()
            serializer = self.serializer_class(district)
            return Response(serializer.data, status=200)
        except Exception as e:
            return Response(
                {"error": "Đã xảy ra lỗi khi lấy thông tin quận huyện.", "details": str(e)},
                status=500
            )

    def put(self, request, *args, **kwargs):
        try:
            district = self.get_object()
            serializer = self.serializer_class(district, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    "message": "Cập nhật quận huyện thành công.",
                    "data": serializer.data
                }, status=200)
            return Response(serializer.errors, status=400)
        except Exception as e:
            return Response(
                {"error": "Đã xảy ra lỗi khi cập nhật quận huyện.", "details": str(e)},
                status=500
            )

    def delete(self, request, *args, **kwargs):
        try:
            district = self.get_object()
            district.delete()
            return Response({"message": "Xóa quận huyện thành công."}, status=204)
        except Exception as e:
            return Response(
                {"error": "Đã xảy ra lỗi khi xóa quận huyện.", "details": str(e)},
                status=500
            )
