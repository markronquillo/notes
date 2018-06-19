from django import forms
from django.contrib.auth import get_user_model
from mailinglist.models import MailingList, Subscriber, Message

class MailingListForm(forms.ModelForm):
    """
    A form that will accept the name and owner of a mailing list
    ModelForm:
        - uses MailingList model
        - uses fields 'owner' and 'name' and will automatically
            get the appropriate fields.
        - changed the owner field into the defined in `forms.ModelChoiceField(...)`
    """
    owner = forms.ModelChoiceField(
        widget=forms.HiddenInput,
        queryset=get_user_model().objects.all(),
        disabled=True
    )

    class Meta:
        model = MailingList
        fields = ['owner', 'name']


class MessageForm(forms.ModelForm):
    """
    The form that lets users send Messages to their MailingList
    """
    mailing_list = forms.ModelChoiceField(
        widget=forms.HiddenInput,
        queryset=MailingList.objects.all(),
        disabled=True
    )

    class Meta:
        model = Message
        fields = ['mailing_list', 'subject', 'body', ]
        

class SubscriberForm(forms.ModelForm):
    """
    Form to accept emails of a new Subscriber for a MailingList
    """

    # this tells our form to use our custom
    # configured ModelChoiceField instead of the default
    # that the forms API would use
    mailing_list = forms.ModelChoiceField(
        widget=forms.HiddenInput,
        queryset=MailingList.objects.all(),
        disabled=True
    )

    class Meta:
        model = Subscriber
        fields = ['mailing_list', 'email', ]

