from django.db import models
from user.models import User
from rental_post.models import RentalPost

# Create your models here.
class Favorite(models.Model):   
    #ForeignKey
    user = models.ForeignKey(User,  on_delete=models.CASCADE, related_name='favorite')
    rentalpost = models.ForeignKey(RentalPost, on_delete=models.CASCADE,  related_name='favorite')
    def __str__(self):
        return f"{self.user}♥{self.rentalpost}"
    
    class Meta:
        unique_together = ('user', 'rentalpost')  # Ngăn trùng dữ liệu yêu thích
    