from django.conf.urls import patterns, include, url
from django.contrib import admin

from tastypie.api import Api
from car.api import CarResource

v1_api = Api(api_name='v1')
v1_api.register(CarResource())


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'interview.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(v1_api.urls)),
)
