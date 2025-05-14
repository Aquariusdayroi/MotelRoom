from django.contrib import admin
from .models import User , OwnerRequest , OwnerRequestImage

admin.site.register(User)
admin.site.register(OwnerRequest)
admin.site.register(OwnerRequestImage)