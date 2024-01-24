from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import UserAccount
import json


class ChangePasswordView(APIView):
    permission_classes = (permissions.IsAuthenticated,)


    def patch(self, request, format=None):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        new_password = body['new_password']
        
        user = self.request.user
        user.set_password(new_password)
        user.save()

        return Response({'message': 'Se ha cambiado la contraseña'}, status=status.HTTP_202_ACCEPTED)


