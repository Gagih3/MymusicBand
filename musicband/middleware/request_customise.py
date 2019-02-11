import json as json
from json import JSONDecodeError


class RequestDelete:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            request.DELETE = json.loads(request.body)
            print(json.loads(request.body))
        except JSONDecodeError:
            pass

        response = self.get_response(request)

        return response
