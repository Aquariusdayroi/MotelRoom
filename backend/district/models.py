from django.db import models
from city.models import City

# Create your models here.
class District(models.Model):
    name_district = models.CharField(max_length=255)
    
    #ForeignKey
    city = models.ForeignKey(City,  on_delete=models.SET_NULL, null=True, blank=True, related_name='district')
    def __str__(self):
        return self.name_district
    