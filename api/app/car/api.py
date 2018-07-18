from tastypie.resources import ModelResource
from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from car.models import Car


class CarResource(ModelResource):
    class Meta:
        queryset = Car.objects.all()
        resource_name = 'car'

        allowed_methods = ['get', 'put', 'patch']
        always_return_data = True
        authentication = Authentication()
        authorization = Authorization()
