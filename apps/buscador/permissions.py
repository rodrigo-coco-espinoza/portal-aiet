from rest_framework import permissions

class BuscadorPermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return (obj.is_buscador_editor == True or obj.is_buscador_admin == True)