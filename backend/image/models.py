from django.db import models
from rental_post.models import RentalPost
from review.models import Review
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os

# Create your models here.
class Image(models.Model):
    #ForeignKey
    rental_post = models.ForeignKey(RentalPost, on_delete=models.CASCADE, null=True, blank=True, related_name='image')
    review = models.ForeignKey(Review, on_delete=models.CASCADE, null=True, blank=True, related_name='image')

    image_url = models.ImageField(upload_to='images/')
    
    def __str__(self):
        return self.image_url.url if self.image_url else "No Image"
    



@receiver(post_delete, sender=Image)
def delete_image_file(sender, instance, **kwargs):
    if instance.image_url and os.path.isfile(instance.image_url.path):
        os.remove(instance.image_url.path)