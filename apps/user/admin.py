# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from django.contrib.auth.forms import UserChangeForm, UserCreationForm
# from django import forms
# from .models import UserAccount

# class CustomUserCreationForm(UserCreationForm):
#     username = forms.CharField(required=True)

#     class Meta(UserCreationForm.Meta):
#         model = UserAccount
#         fields = ('username', 'password1', 'password2')

#     def save(self, commit=True):
#         user = super().save(commit=False)
#         user.set_password(self.cleaned_data["password1"])
#         if commit:
#             user.save()
#         return user

# class CustomUserChangeForm(UserChangeForm):
#     class Meta:
#         model = UserAccount
#         fields = '__all__'

# @admin.register(UserAccount)
# class CustomUserAdmin(BaseUserAdmin):
#     add_form = CustomUserCreationForm
#     form = CustomUserChangeForm
#     model = UserAccount

#     add_fieldsets = (
#         (None, {'fields': ('username', 'password')}),
#         ('Permissions', {'fields': ('is_active', 'is_staff', 'is_pc_isla_editor', 'is_pc_isla_admin', 'is_convenios_editor', 'is_convenios_admin', 'is_buscador_editor', 'is_buscador_admin', 'persona', 'is_superuser')}),
#     )

#     list_display = ('username', 'is_staff', 'is_pc_isla_editor', 'is_pc_isla_admin', 'is_convenios_editor', 'is_convenios_admin', 'is_buscador_editor', 'is_buscador_admin', 'persona',)
#     search_fields = ('username', 'is_staff', 'is_pc_isla_editor', 'is_pc_isla_admin', 'is_convenios_editor', 'is_convenios_admin', 'is_buscador_editor', 'is_buscador_admin', 'persona',)

#     def get_form(self, request, obj=None, **kwargs):
#         if obj:
#             # Modify the form for change view
#             kwargs['form'] = CustomUserChangeForm
#         else:
#             # Modify the form for add view
#             kwargs['form'] = CustomUserCreationForm

#         return super().get_form(request, obj, **kwargs)


from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UserAccount

@admin.register(UserAccount)
class CustomUserAdmin(BaseUserAdmin):
    model = UserAccount
    list_display = ('username', 'is_staff', 'is_pc_isla_editor', 'is_pc_isla_admin', 'is_pc_isla_investigador', 'is_convenios_editor', 'is_convenios_admin', 'is_buscador_editor', 'is_buscador_admin', 'persona',)
    search_fields = ('username', 'is_staff', 'is_pc_isla_editor', 'is_pc_isla_admin', 'is_pc_isla_investigador', 'is_convenios_editor', 'is_convenios_admin', 'is_buscador_editor', 'is_buscador_admin', 'persona',)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_pc_isla_editor', 'is_pc_isla_admin', 'is_pc_isla_investigador', 'is_convenios_editor', 'is_convenios_admin', 'is_buscador_editor', 'is_buscador_admin', 'persona', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'is_active', 'is_staff', 'is_pc_isla_editor', 'is_pc_isla_admin', 'is_pc_isla_investigador', 'is_convenios_editor', 'is_convenios_admin', 'is_buscador_editor', 'is_buscador_admin', 'persona', 'is_superuser'),
        }),
    )
