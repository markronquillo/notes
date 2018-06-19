import uuid

from django.conf import settings
from django.db import models
from django.urls import reverse


class MailingList(models.Model):
    """
    The MailingList model will represent a mailing list that one of our users has created.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    owner = models.ForeignKey(
        to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse(
            'mailinglist:manage_mailinglist', kwargs={'pk': self.id})

    def user_can_use_mailing_list(self, user):
        """
        Convenience method that checks whether the given user is the owner
        """
        return user == self.owner


class Subscriber(models.Model):
    """
    A Subscriber model can only belong to one MailingList and must confirm their subscription
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField()
    confirmed = models.BooleanField(default=False)
    mailing_list = models.ForeignKey(to=MailingList, on_delete=models.CASCADE)

    class Meta:
        """
        A Meta class information to lets us add additional constraint etc to our model
        """
        unique_together = [
            'email',
            'mailing_list',
        ]


class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    mailing_list = models.ForeignKey(to=MailingList, on_delete=models.CASCADE)
    subject = models.CharField(max_length=140)
    body = models.TextField()
    started = models.DateTimeField(default=None, null=True)
    finished = models.DateTimeField(default=None, null=True)
