from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, DeleteView, CreateView, DetailView
from django.urls import reverse_lazy, reverse
from django.shortcuts import get_object_or_404

from mailinglist.forms import MailingListForm, SubscriberForm, MessageForm

from mailinglist.mixins import UserCanUseMailingList
from mailinglist.models import MailingList, Subscriber, Message


class MailingListListView(LoginRequiredMixin, ListView):
    """
    To help the view know what to list, we override the get_queryset() method
    and return a QuerySet that includes only thte mailinglist owned by the 
    currently logged in user
    """
    def get_queryset(self):
        return MailingList.objects.filter(owner=self.request.user)


class CreateMailingListView(LoginRequiredMixin, CreateView):
    """
    When CreateView instantiates our MailingListForm, CreateView 
    calls its get_initial() method to get the initial data for the form.

    We use this hook to make sure that the form's owner is set to the logged in 
    user's id.
    """
    form_class = MailingListForm
    template_name = 'mailinglist/mailinglist_form.html'

    def get_initial(self):
        return {
            'owner': self.request.user.id
        }

class DeleteMailingListView(LoginRequiredMixin, UserCanUseMailingList, DeleteView):
    model = MailingList
    success_url = reverse_lazy('mailinglist:mailinglist_list')


class MailingListDetailView(LoginRequiredMixin, UserCanUseMailingList, DetailView):
    model = MailingList

class SubscribeToMailingListView(CreateView):
    form_class = SubscriberForm
    template_name = 'mailinglist/subscriber_form.html'

    def get_initial(self):
        return {
            'mailing_list': self.kwargs['mailinglist_id']
        }

    def get_success_url(self):
        return reverse('mailinglist:subscriber_thankyou', kwargs={ 'pk': self.object.mailing_list.id})

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        mailing_list_id = self.kwargs['mailinglist_id']
        ctx['mailing_list'] = get_object_or_404(
            MailingList,
            id=mailing_list_id
        )
        return ctx

class ThankYouForSubscribingView(DetailView):
    model = MailingList
    template_name = 'mailinglist/subscription_thankyou.html'


class ConfirmSubscriptionView(DetailView):
    model = Subscriber
    template_name = 'mailinglist/confirm_subscription.html'

    def get_object(self, queryset=None):
        subscriber = super().get_object(queryset=queryset)
        subscriber.confirmed = True
        subscriber.save()
        return subscriber

class UnsubscribeView(DeleteView):
    model = Subscriber
    template_name = 'mailinglist/unsubscribe.html'

    def get_success_url(self):
        mailing_list = self.object.mailing_list
        return reverse('mailinglist:subscribe', kwargs={
            'mailinglist_pk': mailing_list.id
        })


class CreateMessageView(LoginRequiredMixin, CreateView):
    SAVE_ACTION = 'save'
    PREVIEW_ACTION = 'preview'

    form_class = MessageForm
    template_name = 'mailinglist/message_form.html'

    def get_success_url(self):
        """
        After a message is successfully created, 
        we'll redirect our users to the management page of the MailingList
        """
        return reverse('mailinglist:manage_mailinglist', kwargs={'pk': self.object.mailing_list.id})


    def get_initial(self):
        mailing_list = self.get_mailing_list()
        return {
            'mailing_list': mailing_list.id
        }

    def get_context_data(self, **kwargs):
        """
        Provides extra variables to the template's context.
        """
        ctx = super().get_context_data(**kwargs)
        mailing_list = self.get_mailing_list()
        ctx.update({
            'mailing_list': mailing_list,
            'SAVE_ACTION': self.SAVE_ACTION,
            'PREVIEW_ACTION': self.PREVIEW_ACTION
        })
        return ctx

    def form_valid(self, form):
        action = self.request.POST.get('action')
        if action == self.PREVIEW_ACTION:
            context = self.get_context_data(
                form=form,
                message=form.instance
            )
            return self.render_to_response(context=context)
        elif action == self.SAVE_ACTION:
            return super().form_valid(form)

    
    def get_mailing_list(self):
        """
        To prevent logged in but unauthorized users from sending messages,
        we will create a central `get_mailing_list()` method which checkes that
        the logged in user can use this mailing list.
        """
        mailing_list = get_object_or_404(MailingList, id=self.kwargs['mailinglist_pk'])

        if not mailing_list.user_can_use_mailing_list(self.request.user):
            raise PermissionDenined()
        return mailing_list


class MessageDetailView(LoginRequiredMixin, UserCanUseMailingList, DetailView):
    model = Message