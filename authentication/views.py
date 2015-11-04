from rest_framework import permissions, viewsets, views
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED

from .models import Account
from .permissions import IsAccountOwner
from .serializers import AccountSerializer

import json
from django.contrib.auth import authenticate, login


class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)

            return Response(data=serializer.validated_data, status=HTTP_201_CREATED)

        return Response(data={
            'status': 'Bad Request',
            'message': 'Account could not be created'
        }, status=HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)

        username = data.get('username', None)
        password = data.get('password', None)

        account = authenticate(username=username, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)
                serialized = AccountSerializer(account)

                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'this account has been disabled'
                }, status=HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                    'status': 'Unauthorized',
                    'message': 'Bad username or password'
                }, status=HTTP_401_UNAUTHORIZED)
