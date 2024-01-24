from django.contrib import admin
from django.contrib.auth.forms import UserCreationForm
from django import forms
from .models import UserAccount
# Register your models here.


class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta(UserCreationForm.Meta):
        model = UserAccount
        fields = ('email', 'first_name', 'last_name', 'password1', 'password2')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


@admin.register(UserAccount)
class UserAdmin(admin.ModelAdmin):
    fields = ('email', 'first_name', 'last_name', 'password', 'is_active', 'is_staff', 'is_editor','is_superuser')

    list_display = ('first_name', 'last_name', 'email', 'is_staff', 'is_editor',)
    search_fields = ('first_name', 'last_name', 'email', 'is_staff', 'is_editor',)

    def save_model(self, request, obj, form, change):
            """
            Override the save_model method to handle password hashing.
            """
            # If the password field is not empty, set the password using set_password
            if form.cleaned_data['password']:
                obj.set_password(form.cleaned_data['password'])

            super().save_model(request, obj, form, change)
