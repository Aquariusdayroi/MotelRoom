from django.db import models
from rental_post.models import RentalPost
from review.models import Review

# Create your models here.
class Image(models.Model):
    #ForeignKey
    rental_post = models.ForeignKey(RentalPost, on_delete=models.CASCADE, null=True, blank=True, related_name='image')
    review = models.ForeignKey(Review, on_delete=models.CASCADE, null=True, blank=True, related_name='image')

    image_url = models.ImageField(upload_to='images/')
    
    def __str__(self):
        return self.image_url