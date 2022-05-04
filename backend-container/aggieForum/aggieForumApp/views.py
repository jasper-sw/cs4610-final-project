import json
import os

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Subreddit, Subscription, Comment, Post
from django.http import HttpResponseRedirect

# get base url .env var
try:
    base_url = os.environ["BASE_URL"]
except KeyError:
    base_url = "localhost:3000"


class CreateAccount(APIView):

    def post(self, request, *args, **kwargs):
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


class DeleteAccount(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        target_user = (User.objects.filter(id=body["id"]))[0]
        target_user.delete()
        return JsonResponse({"delete result": "Success"})


class CreateSubreddit(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        new_subreddit = Subreddit.objects.create(name=body["name"],
                                                 description=body["description"],
                                                 mod_user_id=body["mod_user_id"])
        new_subreddit.save()
        created_subreddit = Subreddit.objects.filter(name=body["name"],
                                                     description=body["description"],
                                                     mod_user_id=body["mod_user_id"])
        return JsonResponse({"Created subreddit: ": str(created_subreddit)})


class DeleteSubreddit(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        target_subreddit = (Subreddit.objects.filter(id=body["id"]))[0]
        target_subreddit.delete()
        return JsonResponse({"delete result": "Success"})


class CreatePost(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        new_post = Post.objects.create(title=body["title"],
                                       body=body["body"],
                                       posted_by_user_id=body["posted_by_user_id"],
                                       subreddit_id=body["subreddit_id"])
        new_post.save()
        created_post = (Post.objects.filter(title=new_post.title,
                                            body=new_post.body,
                                            posted_by_user_id=new_post.posted_by_user_id,
                                            subreddit_id=new_post.subreddit_id))[0]
        return JsonResponse({"Created post: ": str(created_post)})


class DeletePost(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        target_post = (Post.objects.filter(id=body["id"]))[0]
        target_post.delete()
        return JsonResponse({"delete result": "Success"})


class CreateSubscription(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        new_sub = Subscription.objects.create(user_id=body["user_id"],
                                              subreddit_id=body["subreddit_id"])
        new_sub.save()
        created_sub = (Subscription.objects.filter(user_id=new_sub.user_id,
                                                   subreddit_id=new_sub.subreddit_id))[0]
        return JsonResponse({"Created post: ": str(created_sub)})


class DeleteSubscription(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        target_sub = (Subscription.objects.filter(id=body["id"]))[0]
        target_sub.delete()
        return JsonResponse({"delete result": "Success"})


class CreateComment(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        new_comment = Comment.objects.create(body=body["body"],
                                             posted_by_user_id=body["posted_by_user_id"],
                                             post_id=body["post_id"])
        new_comment.save()
        created_comment = (Comment.objects.filter(body=body["body"],
                                                  posted_by_user_id=body["posted_by_user_id"],
                                                  post_id=body["post_id"]))[0]
        return JsonResponse({"Created post: ": str(created_comment)})


class DeleteComment(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        target_comment = (Comment.objects.filter(id=body["id"]))[0]
        target_comment.delete()
        return JsonResponse({"delete result": "Success"})


class GetUserSubscriptions(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        subs = Subscription.objects.filter(user_id=body["user_id"])
        subs_list = []
        for sub in subs:
            subs_list.append(sub.__dict__())
        return JsonResponse({"Subscriptions for user: [{}]".format(request.user.id): subs_list})


class GetUserPosts(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        posts = Post.objects.filter(posted_by_user_id=body["user_id"])
        posts_list = []
        for post in posts:
            posts_list.append(post.__dict__())
        return JsonResponse({"Posts for user: [{}]".format(request.user.id): posts_list})


class GetUserComments(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        comments = Comment.objects.filter(posted_by_user_id=body["user_id"])
        comments_list = []
        for comment in comments:
            comments_list.append(comment.__dict__())
        return JsonResponse({"Comments for user: [{}]".format(request.user.id): comments_list})


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

    return JsonResponse({'username': request.user.username,
                         'user_id': request.user.id})
