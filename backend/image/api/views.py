from rest_framework.viewsets import ModelViewSet
from image.models import Image
from .serializers import ImageSerializer

class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
