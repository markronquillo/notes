from django.core.exceptions import PermissionDenied, FieldDoesNotExist

from mailinglist.models import MailingList


class UserCanUseMailingList:
    """
    This method has the same signature as `SingleObjectMixin.get_object()`, 
    which is used by many Django's built in CBV.
    """
    def get_object(self, queryset=None):
        obj = super().get_object(queryset)
        user = self.request.user
        if isinstance(obj, MailingList):
            if obj.user_can_use_mailing_list(user):
                return obj
            else:
                raise PermissionDenied()

        mailing_list_attr = getattr(obj, 'mailing_list')
        if isinstance(mailing_list_attr, MailingList):
            if mailing_list_attr.user_can_use_mailing_list(user):
                return obj
            else:
                raise PermissionDenied()
        raise FieldDoesNotExist('view does not know know to get mailing list')
        