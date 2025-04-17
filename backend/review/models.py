from django.db import models
from user.models import User
from rental_post.models import RentalPost
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Review(models.Model):
    #ForeignKey
    rental_post = models.ForeignKey(RentalPost, on_delete=models.CASCADE, related_name='review')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')

    rating = models.DecimalField(
            max_digits=2, 
            decimal_places=1,  
            validators=[
                MinValueValidator(1), 
                MaxValueValidator(5)
            ]
        )
    comment = models.CharField(max_length=255)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review {self.id} by {self.user.email}"
