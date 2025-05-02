from django.db import models
from district.models import District
from city.models import City
# Create your models here.    

class Address(models.Model):
    description = models.CharField(max_length=255)
    
    latitude = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    longitude = models.DecimalField(max_digits=8, decimal_places=2, null= True)

    # ForeignKey
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True, related_name='address')
    district = models.ForeignKey(District, on_delete=models.SET_NULL, null=True, blank=True, related_name='address')
