from django.db import models
from datetime import datetime


class Subreddit(models.Model):
    # here we generate a unique id for the subreddit
    id = models.IntegerField(primary_key=True, blank=False)
    name = models.CharField(max_length=64, null=False)
    description = models.CharField(max_length=1024, null=False)
    # the mod of this subreddit
    mod_user_id = models.IntegerField(null=True, blank=False)

    def __str__(self):
        return '[Subreddit] Subreddit_id: [{}], ' \
               'Name: [{}], ' \
               'Description: [{}], ' \
               'Mod_user_id: [{}]'.format(self.id,
                                          self.name,
                                          self.description,
                                          self.mod_user_id)

    def __dict__(self):
        return {"id": self.id,
                "name": self.name,
                "description": self.description,
                "mod_user_id": self.mod_user_id}


# a lookup table to store subscriptions for users
class Subscription(models.Model):
    # here we generate a unique id for the subreddit
    id = models.IntegerField(primary_key=True, blank=False)
    user_id = models.IntegerField(null=True, blank=False)
    subreddit_id = models.IntegerField(null=True, blank=False)

    def __str__(self):
        return '[Subscription] ' \
               'id: [{}], ' \
               'user_id: [{}], ' \
               'subreddit_id: [{}]'.format(self.id,
                                           self.user_id,
                                           self.subreddit_id)

    def __dict__(self):
        return {"id": self.id, "user_id": self.user_id, "subreddit_id": self.subreddit_id}


class Post(models.Model):
    # here we generate a unique id for the post
    id = models.IntegerField(primary_key=True, blank=False)
    title = models.CharField(max_length=64, null=False)
    body = models.CharField(max_length=2048, null=False)
    posted_by_user_id = models.IntegerField(null=True, blank=False)
    posted_date = models.DateTimeField(default=datetime.now, blank=True)
    upvote_count = models.IntegerField(default=0, blank=False)
    downvote_count = models.IntegerField(default=0, blank=False)
    # the subreddit this post belongs to
    subreddit_id = models.IntegerField(null=True, blank=False)

    def __str__(self):
        return "[Post] Post_id: [{}], " \
               "Title: [{}], Body: [{}], " \
               "Posted_by_user_id: [{}], " \
               "Posted_date: [{}], " \
               "Upvote_count: [{}], " \
               "Downvote_count: [{}], " \
               "Subreddit_id: [{}]".format(self.id,
                                           self.title,
                                           self.body,
                                           self.posted_by_user_id,
                                           self.posted_date,
                                           self.upvote_count,
                                           self.downvote_count,
                                           self.subreddit_id)

    def __dict__(self):
        return {"id": self.id,
                "title": self.title,
                "body": self.body,
                "posted_by_user_id": self.posted_by_user_id,
                "posted_date": self.posted_date,
                "upvote_count": self.upvote_count,
                "downvote_count": self.downvote_count,
                "subreddit_id": self.subreddit_id}


class Comment(models.Model):
    # here we generate a unique id for the comment
    id = models.IntegerField(primary_key=True, blank=False)
    body = models.CharField(max_length=2048, null=False)
    posted_by_user_id = models.IntegerField(null=True, blank=False)
    posted_date = models.DateTimeField(default=datetime.now, blank=True)
    upvote_count = models.IntegerField(default=0, blank=False)
    downvote_count = models.IntegerField(default=0, blank=False)
    # the post this comment belongs to
    post_id = models.IntegerField(null=True, blank=False)

    def __str__(self):
        return "[Comment] comment_id: [{}], " \
               "Body: [{}], " \
               "Posted_by_user_id: [{}], " \
               "Posted_date: [{}], " \
               "Upvote_count: [{}], " \
               "Downvote_count: [{}], " \
               "post_id: [{}]".format(self.id,
                                      self.body,
                                      self.posted_by_user_id,
                                      self.posted_date,
                                      self.upvote_count,
                                      self.downvote_count,
                                      self.post_id)

    def __dict__(self):
        return {"id": self.id,
                "body": self.body,
                "posted_by_user_id": self.posted_by_user_id,
                "posted_date": self.posted_date,
                "upvote_count": self.upvote_count,
                "downvote_count": self.downvote_count,
                "post_id": self.post_id}
