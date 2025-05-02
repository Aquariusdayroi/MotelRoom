from django.contrib import admin
from city.models import City
from district.models import District
from address.models import Address

# Register your models here.
admin.site.register(City)
admin.site.register(District)
admin.site.register(Address)