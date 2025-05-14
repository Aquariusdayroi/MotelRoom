from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from city.models import City
from district.models import District
from address.models import Address
from rental_post.models import RentalPost



class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email phải được cung cấp.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('role', 'admin')
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('role') != 'admin':
            raise ValueError('Superuser phải có role là admin.')
        return self.create_user(email, password, **extra_fields)



class User(AbstractBaseUser, PermissionsMixin):
    REGISTRATION_TYPES = [('local', 'Local'), ('google', 'Google')]
    ROLES = [('user', 'User'), ('owner', 'Owner'), ('admin', 'Admin')]

    email = models.EmailField(unique=True)
    email_verified_at = models.DateTimeField(null=True, blank=True)
    password = models.CharField(max_length=255, null=True, blank=True)
    google_id = models.CharField(max_length=255, null=True, blank=True, unique=True)
    registration_type = models.CharField(max_length=10, choices=REGISTRATION_TYPES, default='local')
    fullname = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255, null=True, blank=True, unique=True)
    
    # Các trường của user đăng ký thành owner
    cccd = models.CharField(max_length=12, null=True, blank=True) 
    image_front_cccd = models.ImageField(upload_to='cccd/front/', null=True, blank=True)
    image_back_cccd = models.ImageField(upload_to='cccd/back/', null=True, blank=True)

    # ForeignKey
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True, related_name='user')
    district = models.ForeignKey(District, on_delete=models.SET_NULL, null=True, blank=True, related_name='user')
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True, related_name='user')

    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True, default='avatars/default.jpg')
    birthday = models.DateTimeField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    role = models.CharField(max_length=10, choices=ROLES, default='user')

    # Các trường cần cho quyền admin hoạt động
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Các trường bắt buộc
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fullname']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class OwnerRequest(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    rental_post_data = models.JSONField()
    cccd = models.CharField(max_length=12) 
    image_front_cccd = models.ImageField(upload_to='cccd/front/', null=True, blank=True)
    image_back_cccd = models.ImageField(upload_to='cccd/back/', null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)
    rejection_reason = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.fullname