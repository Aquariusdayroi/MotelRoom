from django.db import models
from city.models import City
from district.models import District
from user.models import User
# Create your models here.
class RentalPost(models.Model):
    HOME_TYPES = [
        ('Chung cư', 'Chung cư'),
        ('Nhà trọ', 'Nhà trọ'),
        ('Dãy trọ', 'Dãy trọ'),
        ('Share phòng', 'Share phòng'),
    ]

    #ForeignKey
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rental_post')
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, related_name='rental_post')
    district = models.ForeignKey(District, on_delete=models.SET_NULL, null=True, related_name='rental_post')

    
    home_type = models.CharField(max_length=20, choices=HOME_TYPES)
    title = models.CharField(max_length=255)
    summary = models.CharField(max_length=500)


    information_detail = models.TextField()
    detail_address = models.CharField(max_length=255)
    total_occupancy = models.PositiveSmallIntegerField()
    acreage = models.DecimalField(max_digits=8, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    latitude = models.DecimalField(max_digits=8, decimal_places=2)
    longitude = models.DecimalField(max_digits=8, decimal_places=2)
    has_toilet = models.BooleanField()
    private_rental = models.BooleanField()
    has_washing = models.BooleanField()
    curfew_time = models.BooleanField()

    def __str__(self):
        return self.title
