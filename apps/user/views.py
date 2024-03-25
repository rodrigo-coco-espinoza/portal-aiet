from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import UserAccount
import json
from .serializers import EncargadosPcIslaSerializer


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


class EncargadosPcIslaView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        encargados = UserAccount.objects.filter(is_pc_isla_editor=True)

        if encargados.exists():
            resultEncargados = [EncargadosPcIslaSerializer(encargado).data for encargado in encargados]

            return Response({
                'encargadosPcIslaOptions': resultEncargados,
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron encargados.'}, status=status.HTTP_404_NOT_FOUND)