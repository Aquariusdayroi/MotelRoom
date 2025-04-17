from django.db import models

# Create your models here.
class City(models.Model):
    name_city = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name_city