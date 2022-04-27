from django.db import models
from datetime import datetime


class Subreddit(models.Model):
    # here we generate a unique id for the subreddit
    subreddit_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=64, null=False)
    description = models.CharField(max_length=1024, null=False)
    # the mod of this subreddit
    mod_user_id = models.IntegerField(null=True, blank=False)


# a lookup table to store subscriptions for users
class Subscription(models.Model):
    # here we generate a unique id for the subreddit
    subscription_id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField(null=True, blank=False)
    subreddit_id = models.IntegerField(null=True, blank=False)


class Post(models.Model):
    # here we generate a unique id for the post
    post_id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=64, null=False)
    body = models.CharField(max_length=2048, null=False)
    posted_by_user_id = models.IntegerField(null=True, blank=False)
    posted_date = models.DateTimeField(default=datetime.now, blank=True)
    upvote_count = models.IntegerField(default=0, blank=False)
    downvote_count = models.IntegerField(default=0, blank=False)
    # the subreddit this post belongs to
    subreddit_id = models.IntegerField(null=True, blank=False)


class Comment(models.Model):
    # here we generate a unique id for the comment
    comment_id = models.IntegerField(primary_key=True)
    body = models.CharField(max_length=2048, null=False)
    posted_by_user_id = models.IntegerField(null=True, blank=False)
    posted_date = models.DateTimeField(default=datetime.now, blank=True)
    upvote_count = models.IntegerField(default=0, blank=False)
    downvote_count = models.IntegerField(default=0, blank=False)
    # the post this comment belongs to
    post_id = models.IntegerField(null=True, blank=False)
