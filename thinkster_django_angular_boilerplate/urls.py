from django.conf.urls import patterns, url, include
from rest_framework.routers import SimpleRouter
from thinkster_django_angular_boilerplate.views import IndexView
from authentication.views import AccountViewSet

router = SimpleRouter()
router.register(r'accounts', AccountViewSet)

urlpatterns = patterns(
    '',
    url(r'^api/v1/', include(router.urls)),
    url('^.*$', IndexView.as_view(), name='index'),
)
