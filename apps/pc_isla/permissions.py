from rest_framework import permissions

class PcIslaPermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return (obj.is_pc_isla_editor == True or obj.is_pc_isla_admin == True)
    
class InvestigadorPermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return (obj.is_pc_isla_investigador == True)