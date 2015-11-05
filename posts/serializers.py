from rest_framework import serializers

from authentication.models import Account
from authentication.serializers import AccountSerializer
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Post

        fields = ('id', 'author', 'content', 'created_at', 'edited_at')
        read_only_fields = ('id', 'created_at', 'edited_at')

        def get_validation_exclusions(self, *args, **kwargs):
            return super(PostSerializer, self).get_validation_exclusions() + ['author']