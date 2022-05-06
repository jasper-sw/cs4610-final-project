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
from django.db.models import Q

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
        return JsonResponse({"created_user: ": str(new_user)})


class DeleteAccount(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        target_user = (User.objects.filter(id=body["id"]))[0]
        target_user.delete()
        return JsonResponse({"delete_result": "Success"})


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
        created_subreddit = (Subreddit.objects.filter(name=body["name"],
                                                      description=body["description"],
                                                      mod_user_id=body["mod_user_id"]))[0]
        return JsonResponse({"created_subreddit: ": created_subreddit.to_dict()})


class DeleteSubreddit(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        target_subreddit = (Subreddit.objects.filter(id=body["id"]))[0]
        target_subreddit.delete()
        return JsonResponse({"delete_result": "Success"})


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
        return JsonResponse({"created_post: ": created_post.to_dict()})


class DeletePost(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        target_post = (Post.objects.filter(id=body["id"]))[0]
        target_post.delete()
        return JsonResponse({"delete_result": "Success"})


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
        return JsonResponse({"created_subscription: ": created_sub.to_dict()})


class DeleteSubscription(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        target_sub = (Subscription.objects.filter(id=body["id"]))[0]
        target_sub.delete()
        return JsonResponse({"delete_result": "Success"})


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
        return JsonResponse({"created_post: ": created_comment.to_dict()})


class DeleteComment(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        target_comment = (Comment.objects.filter(id=body["id"]))[0]
        target_comment.delete()
        return JsonResponse({"delete_result": "Success"})


class GetUserSubscriptions(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        subs = Subscription.objects.filter(user_id=body["user_id"])
        subs_list = []
        errors_list = []
        for sub in subs:
            try:
                subs_list.append((Subreddit.objects.filter(id=sub.subreddit_id))[0].to_dict())
            except IndexError:
                errors_list.append("Couldn't add subreddit with id: {}".format(sub.id))
        return JsonResponse({"subscriptions": subs_list, "errors": errors_list, "user_id": request.user.id})


class GetUserPosts(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        posts = Post.objects.filter(posted_by_user_id=body["user_id"])
        posts_list = []
        for post in posts:
            posts_list.append(post.to_dict())
        return JsonResponse({"posts": posts_list, "user_id": request.user.id})


class GetUserComments(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        comments = Comment.objects.filter(posted_by_user_id=body["user_id"])
        comments_list = []
        for comment in comments:
            comments_list.append(comment.to_dict())
        return JsonResponse({"comments": comments_list, "user_id": request.user.id})


class GetAllSubreddits(APIView):

    def post(self, request, *args, **kwargs):
        body = request.data
        print(body)
        subreddits = Subreddit.objects.all()
        subreddit_list = []
        for sub in subreddits:
            subreddit_list.append(sub.to_dict())
        return JsonResponse({"all_subreddits": subreddit_list})


class GetInfo(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        try:
            if body["info_type"] == "subreddit":
                sub = (Subreddit.objects.filter(id=body["item_id"]))[0]
                return JsonResponse({"info": sub.to_dict()})
            elif body["info_type"] == "post":
                post = (Post.objects.filter(id=body["item_id"]))[0]
                return JsonResponse({"info": post.to_dict()})
            elif body["info_type"] == "comment":
                comment = (Comment.objects.filter(id=body["item_id"]))[0]
                return JsonResponse({"info": comment.to_dict()})
            else:
                return JsonResponse({"info": "PLEASE SPECIFY info_type IN REQUEST BODY"})
        except IndexError:
            return JsonResponse({"info": "NO ITEM WITH ID: [{}] OF TYPE: [{}]".format(body["item_id"],
                                                                                      body["info_type"])})


class IncrementUpvote(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        if body["item_type"] == "post":
            post = (Post.objects.filter(id=body["item_id"]))[0]
            original_post = post
            post.upvote_count += 1
            post.save()
            return JsonResponse({"updated_object": post.to_dict(),
                                 "old_object": original_post.to_dict()})
        elif body["item_type"] == "comment":
            comment = (Comment.objects.filter(id=body["item_id"]))[0]
            original_comment = comment
            comment.upvote_count += 1
            comment.save()
            return JsonResponse({"updated_object": comment.to_dict(),
                                 "old_object": original_comment.to_dict()})
        else:
            return JsonResponse({"info": "PLEASE SPECIFY item_type IN REQUEST BODY"})


class DecrementUpvote(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        if body["item_type"] == "post":
            post = (Post.objects.filter(id=body["item_id"]))[0]
            original_post = post
            post.upvote_count -= 1
            post.save()
            return JsonResponse({"updated_object": post.to_dict(),
                                 "old_object": original_post.to_dict()})
        elif body["item_type"] == "comment":
            comment = (Comment.objects.filter(id=body["item_id"]))[0]
            original_comment = comment
            comment.upvote_count -= 1
            comment.save()
            return JsonResponse({"updated_object": comment.to_dict(),
                                 "old_object": original_comment.to_dict()})
        else:
            return JsonResponse({"info": "PLEASE SPECIFY item_type IN REQUEST BODY"})


class Search(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        body = request.data
        print(body)
        query_string = body["query_string"]
        query_results = []
        posts = Post.objects.all()
        posts.filter(Q(body__icontains=query_string) | Q(title__icontains=query_string))
        for post in posts:
            query_results.append(post.to_dict())
        subreddits = Subreddit.objects.all()
        subreddits.filter(Q(name__icontains=query_string) | Q(description__icontains=query_string))
        for sub in subreddits:
            query_results.append(sub.to_dict())
        return JsonResponse({"results": query_results})


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
                         'user_id': request.user.id,
                         'first_name': request.user.first_name,
                         'last_name': request.user.last_name,
                         'email': request.user.email})
