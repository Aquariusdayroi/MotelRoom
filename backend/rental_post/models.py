from django.db import models
from city.models import City
from district.models import District
from address.models import Address

# Create your models here.
class RentalPost(models.Model):
    HOME_TYPES = [
        ('phòng trọ', 'Phòng trọ'),
        ('studio', 'Studio'),
        ('duplex', 'Duplex'),
        ('căn hộ dịch vụ', 'Căn hộ dịch vụ'),
    ]

    #ForeignKey
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='rental_post')
    home_type = models.CharField(max_length=20, choices=HOME_TYPES, default="phòng trọ")
    title = models.CharField(max_length=255)

    information_detail = models.TextField()
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, related_name='rental_post')

    total_occupancy = models.PositiveSmallIntegerField()
    acreage = models.DecimalField(max_digits=12, decimal_places=2)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    views = models.PositiveIntegerField(default=0)

    #Trường hiển thị
    is_public = models.BooleanField(default=False)

    ##Trường nội thất liên quan đền phòng trọ
    # Tiện nghi cơ bản
    has_wifi = models.BooleanField(null=True)  # Wifi
    has_tv = models.BooleanField(null=True)  # Tivi
    has_kitchen = models.BooleanField(null=True)  # Bếp
    has_washing_machine = models.BooleanField(null=True)  # Máy giặt
    has_parking = models.BooleanField(null=True)  # Chỗ để xe
    has_fridge = models.BooleanField(null=True)  # Tủ lạnh
    has_air_conditioner = models.BooleanField(null=True)  # Máy lạnh
    has_attic = models.BooleanField(null=True)  # Gác mái
    has_water_heater = models.BooleanField(null=True)  # Máy nước nóng

    # Tiện nghi thêm
    has_dehumidifier = models.BooleanField(null=True)  # Máy hút ẩm
    has_hot_tub = models.BooleanField(null=True)  # Bồn tắm nước nóng
    has_balcony = models.BooleanField(null=True)  # Ban công
    has_elevator = models.BooleanField(null=True)  # Thang máy
    has_microwave = models.BooleanField(null=True)  # Lò vi sóng

    # Tiện nghi an toàn
    has_security_camera = models.BooleanField(null=True)  # Camera an ninh
    has_first_aid_kit = models.BooleanField(null=True)  # Bộ sơ cứu
    has_fingerprint_lock = models.BooleanField(null=True)  # Khóa vân tay


    def __str__(self):
        return self.title

