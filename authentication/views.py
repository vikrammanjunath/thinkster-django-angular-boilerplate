from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from .models import Account
from .permissions import IsAccountOwner
from .serializers import AccountSerializer


class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return permissions.AllowAny
        if self.request.method == 'POST':
            return permissions.AllowAny

        return permissions.IsAuthenticated(), IsAccountOwner()

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create(**serializer.validated_data)

            return Response(data=serializer.validated_data, status=HTTP_201_CREATED)

        return Response(data={
            'status': 'Bad Request',
            'message': 'Account could not be created'
        }, status=HTTP_400_BAD_REQUEST)


