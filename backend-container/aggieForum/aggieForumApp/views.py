import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from rest_framework.views import APIView
from django.contrib.auth.models import User


class CreateAccount(APIView):

    def post(self, request, *args, **kwargs):
        # body_unicode = request.data.decode('utf-8')
        body = request.data
        print(body)
        new_user = User.objects.create(username=body["username"],
                                       password=body["password"],
                                       first_name=body["first_name"],
                                       last_name=body["last_name"],
                                       email=body["email"],
                                       is_staff=True)
        new_user.set_password(body["password"])
        new_user.save()
        return JsonResponse({"Created user: ": str(new_user)})


def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


@require_POST
def login_view(request):
    # body_unicode = request.body.decode('utf-8')
    # print(body_unicode)
    data = json.loads(request.body)
    print(data)
    username = data['username']
    password = data['password']

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'username': request.user.username})