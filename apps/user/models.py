from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from apps.pc_isla.models import Persona

# Create your models here.

class UserAccountManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('Users must have an username.')
        
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, username, password, **extra_fields):
        user = self.create_user(username, password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.is_pc_isla_editor = True
        user.is_pc_isla_admin = True
        user.is_convenios_editor = True
        user.is_convenios_admin = True
        user.is_buscador_editor = True
        user.is_buscador_admin = True

        user.save()

        return user
    

class UserAccount(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    persona = models.ForeignKey(Persona, on_delete=models.SET_NULL, null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_pc_isla_editor = models.BooleanField(default=False)
    is_pc_isla_admin = models.BooleanField(default=False)
    is_convenios_editor = models.BooleanField(default=False)
    is_convenios_admin = models.BooleanField(default=False)
    is_buscador_editor = models.BooleanField(default=False)
    is_buscador_admin = models.BooleanField(default=False)
    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self) -> str:
        return self.username

