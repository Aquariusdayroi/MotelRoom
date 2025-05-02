from django.db import models
from city.models import City
from district.models import District
from address.models import Address
from user.models import User
# Create your models here.
class RentalPost(models.Model):
    HOME_TYPES = [
        ('phòng trọ', 'Phòng trọ'),
        ('studio', 'Studio'),
        ('duplex', 'Duplex'),
        ('căn hộ dịch vụ', 'Căn hộ dịch vụ'),
    ]

    #ForeignKey
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rental_post')
    home_type = models.CharField(max_length=20, choices=HOME_TYPES, default="phòng trọ")
    title = models.CharField(max_length=255)

    information_detail = models.TextField()
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, related_name='rental_post')

    total_occupancy = models.PositiveSmallIntegerField()
    acreage = models.DecimalField(max_digits=12, decimal_places=2)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)


    #Trường nội thất liên quan đền phòng trọ
    has_toilet = models.BooleanField(null=True)
    private_rental = models.BooleanField(null=True)
    has_washing = models.BooleanField(null=True)
    curfew_time = models.BooleanField(null=True)

    def __str__(self):
        return self.title

# class InteriorAmenities(models.Model):
#     rentalpost = models.ForeignKey(RentalPost, on_delete=models.CASCADE, null=True, related_name='interior amenities')
#     bed = models.BooleanField(default=False)
#     cabinet = models.BooleanField(default=False)
#     table = models.BooleanField(default=False)
#     chair = models.BooleanField(default=False)
#     air_conditioner = models.BooleanField(default=False)
#     refrigerator = models.BooleanField(default=False)
#     washing_machine = models.BooleanField(default=False)
#     kitchen = models.BooleanField(default=False)
#     water_heater = models.BooleanField(default=False)
    
# class GeneralAmenities(models.Model):
#     wifi = models.BooleanField(default=False)
#     parking = models.BooleanField(default=False)
#     security = models.BooleanField(default=False)
#     elevator = models.BooleanField(default=False)
#     security_camenra = models.BooleanField(default=False)
#     attic = models.BooleanField(default=False)
#     free_time = models.BooleanField(default=False)
#     window = models.BooleanField(default=False)
#     no_shared_owner = models.BooleanField(default=False)
#     fingerprint_lock = models.BooleanField(default=False)
#     private_toilet = models.BooleanField(default=False)
#     balcony = models.BooleanField(default=False)
    