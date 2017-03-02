

## Chapter 2: Views and URLconfs

Sample View
```python
from django.http import HttpResponse

def hello(request):
    return HttpResponse(“Hello World”)
```


## Chapter 8: Advanced Templates

#### Template Language Review
- A template is a text document, or a normaly Python string, that is marked up using the Django template language. 
A template can contain template tags and variables.
- A template tag is a symbol within a template that does something. 


```python
{% if is_logged_in %}
    Thanks for logging in~
{% else %}
    Please log in
{% endif %}

# variable tags 
{{ my_name }}
```

A context is a _name->value_ mapping like a dictionary that is passed to a template

A template renders a context by replacing the variable ‘holes’ with values from the context and executing all template tags.

#### RequestContext and Context Processors

`django.template.Context` or 

- `django.template.RequestContext`:
Adds a bunch of variables to your template context by default - like HttpRequest object or infomration about the currently logged in user.

This is the manual way of loading the templates and constructing the context objects.
```python
from djdango.template import loader, Context

def view_1(request):
    # ...
    t = loader.get_template(‘template1.html)
    c = Context({
        ‘app’: ‘My app’,
        ‘user’: request.user,
        ‘ip_address’: request.META[‘REMOTE_ADDR],
        ‘message’: ‘I am view 1.’
    })
    return t.render(c)
```

Imagine if you have (10) view functions and all of them needs to refer to the app, user and ip_address values, you have to define them in all of the view functions.
But with _context processors_ we can remove this redundancy. The only requirement is that you have to use _RequestContext_ instead of Context.

```python
# note: that it takes a request parameter.
def custom_proc(request):
    “””A context processor that provides ‘app’, ‘user’, and ‘ip_address’.”
    return {
        ‘app’: ‘My app’,
        ‘user’: request.user,
        ‘ip_address’: request.META[‘REMOTE_ADDR’]
    }

def view_1(request):
    t = loader.get_template(‘template1.html)
    # in this line we ‘pass’ the request parameter
    c = RequestContext(request, {‘message’: ‘I am view 1’}), processors=[custom_proc])
    return t.render(c)


# normally, we just use the helper function render(), to render the template
# it is also possible to override the RequestContext that the render function is using
render(request, ‘template2.html’, context_instance=RequestContext(request, processors=[custom_proc]))
```

There is a context_processors array (in settings.py) which are the context processors applied to RequestContext. Each processor is applied in order. That is, it overrides the previous values if there is a conflict in key names.
```python
‘context_processors’: [
    ‘django.template.context_processors.debug’,
    ...
]
```

- `django.contrib.auth.context_processors.auth`
If this is enabled in the context_processors, every RequestContext will contain the ff:
    - user: An auth.User instance representing the authenticated user or an AnonymousUser.
    - perms: instance of `django.contrib.auth.context_processors.PermWrapper` representing the permissions that the currently logged-in user has.

- `django.template.context_processors.debug`
    - debug - True,
    - sql_queries: contains all the sql queries that have happen during the current request.

- `django.template.context_processors.i18n`: if this is enabled, the RequestContext will contain these two additional variables.
    - languages
    - language_code

- `django.template.context_processors.media`: will contain MEDIA_URL variable

- `django.template.context_processors.static`: will contain STATIC_URL variable

- `django.template.context_processors.csrf`: adds a token that is needed by the `csrf_token` template tag 

- `django.template.context_processors.request`: will contain the current http request.

- `django.contrib.messages.context_processors.messages`
    messages -


#### Automatic HTML Escaping

If you are accepting inputs from users, it is possible that the user might enter values like `<script> alert('hello') </script>`. This is XSS attack. To avoid Cross Site Scripting (XSS) attack:
- use escape filter
- django's automatic HTML escaping.

By default django's templating system escapes your variable tags.

You can turn this off by:

```python
# individual
{{ data|safe }}

# template blocks
{% autoescape off %}
    Hello {{ name }}
{% endautoescape %}


{% autoescape off %}
    Hello {{ name }}

    {% autoescape  on %}
        Hello again {{ name }}
    {% endautoescape %}

{% endautoescape %}

```

#### Inside Template Loading

By default django uses file system based template loader, but django offers a few more loaders.

- file system loader: Loads templates from the filesystem according to the TEMPLATE DIRS
- app directories loader: Loads templates from Django apps on the filesystem. For each INSTALLED_APPS, the loader will look for a templates subdirectory. 

The order of INSTALLED_APPS is significant! You can enable app directories loader by setting APP_DIRS=true.


#### Extending the Template System

Custom template tags and filters must live inside a Django app. The app should contain a _templatetags_ directory, at the same level as models.py, views.py etc. Do not forget to add `__init__.py`.

```
reviews/
    __init__.py
    models.py
    templatetags/
        __init__.py
        review_extras.py
    views.py
```

Add `{% load review_extras %}` inside your template.

The app that contains the custom tags must be in INSTALLED_APPS in order for the {% load %} tag to work.

Creating a template library is a two-step process:

- First, decide which Django application should house the template library. You can create a new app that is solely for template library.

- Second create a templatetags directory in the appropriate Django application library then create __init__.py file inside that folder.


Add this inside the python module (for templatetags)
```python
from django import template

register = template.Library()
```

_Writing Custom Template Filters_

Custom filters are just Python functions that take one or two arguments.

- The value of the variable (input) - not necessarily a string
- The value of the argument - this can have a default value or be left out altogether


`{{ var|foo:"bar" }}` the filter foo would be passed the variable var and the argument bar.


Registering custom filters

```python
# first approach
def cut():
    pass

def lower():
    pass
register.filter('cut', cut)
register.filter('lower', lower)

# second approach as decorator
@register.filter(name='cut')
def cut(value, arg):
    return value. replace(arg, '')

# if you leave the name argument
# it will use the function name as the filter name
@register.filter
def lower(value):
    return value.lower()
```

`register.filter()` also accepts (3) keywords arguments, `is_safe`, `needs_autoescape` and `expects_localtime`.


__Template filters that expect strings__
This will convert an object to its string value before being passed to yoru function:

```python
from django.template.defaultfilters import stringfilter

register = template.Library()

@register.filter
@stringfilter
def lower(value):
    return value.lower()
```

__Filters and auto-escaping__

There are (3) types of strings that can be passed around inside the template code:

- Raw strings are the native Python str or unicode types. 
- Safe strings are strings that have been marked safe from further escaping at output time - `SafeData` or `SafeText`
- Strings marked as 'needing escaping' are always escaped on output regardless of whether they are in autoescape block or not. - `EscapeBytes` or `EscapeText`


```python
@register.filter(is_safe=True)
def myfilter(value):
    return value
```

## Chapter 9: Advanced Models

Recall our example model relation:

```python
from django.db import models

class Publisher(models.Model):
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=50)
    city = models.CharField(max_length=60)
    state_province = models.CharField(max_length=30)
    country = models.CharField(max_length=50)
    website = models.URLField()

class Author(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=40)
    email = models.EmailField()

class Book(models.Model):
    title = models.CharField(max_length=100)
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher)
    publication_date = models.DateField()
```

Accessing Foreign Key Values
```
>>> b = Book.objects.get(id=50)
>>> b.publisher
>>> b.publisher.website

>>> p = Publisher.objects.get(name="Apress Publishing")
>>> p.book_set.all() # [list of books]
```

Accessing Many-to-Many Values
```
>>> b = Book.objects.get(id=50)
>>> b.authors.all()
>>> b.authors.filter(first_name='Adrian')

>>> a = Author.objects.get(...)
>>> a.book_set.all()
```

#### Managers

In Book.objects the `objects` is the model's manager. In short a model's manager is an object through which Django modesl perform database queries.

Each Django model has at least one manager, and you can create custom managers in order to customize database access.


Adding Extra Manager Methods:

If we need to add __table-level__ functionality to our models, we do this by adding extra manager methods.

For __row-level__ we define it in the model methods.

```python
from django.db import models

class BookManager(models.Manager):
    def title_count(self, keyword):
        return self.filter(title__icontains=keyword).count()

class Book(models.Model):
    title = models.CharField(max_length=100)
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher)
    ...
    objects = BookManager()

    def __str__(self):
        return self.title


>>> Book.objects.title_count('django')
```

You can create a new Manager and set it as another property in the model

```python
class DahlManager(models.Manager):
    ...

class Book(models.Model):
    dahl_objects = DalhManager()

>>> book.dahl_objects.all()
```

> Note: if you declare two or more managers in a model, make sure that the one you want to use when the `get_queryset()` function is called is defined first.


Overriding predefined model methods:

You can override some methods that a normal model use like save or delete. +__Do not forget__ to call the parent method if you happen to override these functions.

```python
class Blog(models.Model):
    
    def save(self, *args, **kwargs):
        do_something()

        super(Blog, self).save(*args, **kwargs)
        do_something_else()
```

#### Executing Raw SQL Queries

`Manager.raw()` to perform raw queries and return model instances.

`Manager.raw(*raw_query*, *params=None*, *translations=None*)`


__TODO the topics about custom and raw sql queries__


## Chapter 10: Generic Views

```python
from django.db import models

class Publisher(models.Model):
    ...

class Author(models.Model):
    ...

class Book(models.Model):
    ...

```

```python
# views.py
from django.views.generic import ListView
from books.models import Publisher

class PublisherList(ListView):
    model = Publisher

# urls.py
from django.conf.urls import url
from books.views import PublisherList

urlpatterns = [
    url(r'^publishers/$', PublisherList.as_view())
]

# main urls.py

url(r’^app’, include(‘app.urls’))
```

In addition to the code above, we need to write a template that will be used in this view.
Django tries to guess the template to use given the class based view, which in this case is the `publisher_list.html`.
With the APP_DIRS=True setting, Django will try to get the template in `/path/to/project/books/templates/books/publisher_list.html`

A sample publishers_list.html content.
```jinja2
{% extends “base.html” %}

{% block content %}
    <h2> Publishers </h2>

    <ul>
        {% for publisher in object_list %}
            <li> {{ publisher.name }} </li>
        {% endfor %}
    </ul>
    </ul>

{% endblock %}
```

By default for __list__ type views, the context will contain an object_list list that contains the, well, list for the current view. Additionally, a variable named publisher_list contains the same value. Obviously, this copy of the object_list differs on each list view.
The good news is you can override the variable name, you can define the value for `context_object_name` property of the class view.

```python
from django.views.generic import ListView
from books.models import Publisher

class PublisherList(ListView):
    model = Publisher
    context_object_name = “my_favorite_publishers”
```

#### Adding extra variables or context in template rendering
If you are using a list class based view, more or less you already have the list of objects available during template rendering. 
You can add context/variables to the given default by __subclassing the view__

```python
class PublisherDetail(DetailView):
    model = Publisher

    def get_context_data(self, **kwargs):
        # call the base implementation first to get a context
        context = super(PublisherDetail, self).get_context_data(**kwargs)
        # Add in a queryset of all the books
        context[‘book_list’] = Book.objects.all()
        return context
```

Basically this will merge all the context from all the subclassing (plus adding of context) that happens in your code, so it is possible for a child class to override what the parent class has set in the context.

#### Dynamic filtering

```python
class PublisherBookList(ListView):
    template_name = ‘books/books_by_publisher.html’

    def get_queryset(self):
        self.publisher = get_object_or_404(Publisher, name=self.args[0])
        return Book.objects.filter(publisher=self.publisher)
```

#### Extra work

Problem: we want to track the `last_accessed` date of a given model:

```python

class Author(models.Model):
    ...
    last_accessed = models.DateTimeField()


class AuthorDetailView(DetailView):
    ...
    def get_object(self):
        object = super(AuthorDetailView, self).get_object()
        object.last_accessed = timezone.now()
        object.save()
        return object
``` 


## Chapter 11: User Authentication in Django

Authentication verifies a user is who they claim to be, and authorization determines what an authenticated user is allowed to do.

```python
>>> from django.contrib.auth.models import User
>>> user= User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')

# at this point this user has already been saved
# we now update the last_name by:
>>> user.last_name = "Lennon"
>>> user.save()
```

```python
# creating superusers
>>> python manage.py createsuperuser --username=joe --email=joe@example.com

# changing passwords
>>> python manage.py changepassword *username*

# changing passwords 
>>> from django.contrib.auth.models import User
>>> u = User.objects.get(username='john')
>>> u.set_password('new password')
>>> u.save()
```

#### authenticating users
```python
from django.contrib.auth import authenticate
user = authenticate(username='john', password='secret')

if user is not None:
    # the password verified for the user
    if user.is_active:
        print('User is valid, active and authenticated')
    else:
        print('Pssword is valid, but the account has been disabled')
else:
    print('The username and password were incorrect.')

```

#### Permissions and Authorization

`has_add_permission(), has_change_permission() and has_delete_permission()`

When `django.contrib.auth` is listed in your INSTALLED_APPS setting, it will ensure that three default permission - add, change and delete - are created for each Django model defined in one of your installed applications.

Default permissions for new models each time you run `manage.py migrate` are added by default. If you have an app_label _foo_ and a model named _Bar_ to test for basic permissions you should use:

- add: `user.has_perm('foo.add_bar')`
- change: `user.has_perm('foo.change_bar')`
- delete: `user.has_perm('foo.delete_bar')`

You can use `django.contrib.auth.models.Group` models as a generic way to categorize users in order to apply permissions or label to a group of users.

```python
# Programatically creating permissions
from books.models import BookReview
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType


content_type = ContentType.objects.get_for_model(BookReview)
permission = Permission.objects.create(codename='can_publish',
                                       name='Can Publish Reviews',
                                       content_type=content_type)
```

> Note that permissions are cached after the first time they need to be fetched for permissions check. If you add a permission to a certain user, you can update the cache by fetching the user again i.e. `user = get_object_or_404(User, pk=user_id)`

> Django uses sessions and middlewares to hook up context variables in request objects. This, for example, adds the `request.user` attribute on every request which represents the current user. If there is no authenticated user `AnonymousUser` will be set as the `request.user`. You can tell if a user is authenticated or not by `if request.user.is_authenticated()`.


```python
# how to log a user in
from django.contrib.auth import authenticate, login

def my_view(request):
    username = requets.POST['username']
    password = requets.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
        else:
            # return a disabled account message
    else:
        # return invalid login message
```

> Please note in the code above (login), you need to call authenticate() before you call login(). `authenticate()` sets an attribute on the User noting which authentication backend successfully authenticated that user, and this information is needed later during the login process.

```python
# how to log a user out
# When you call logout() all session data for the current request will
# be wiped out

from django.contrib.auth import logout

def logout_view(request):
    logout(request)
```

You can limit the access of users to a certain view by adding `login_required` decorator.  `login_required()` does the following: (1) if the user isn't logged in, it redirects to `LOGIN_URL`, passing the current absolute path in the query string i.e. /accounts/login??next=/reviews/3/. (2) if the user is logged in, execute the view normally. 

If you want to use a different name for the `next` parameter, you can define the redirect_field_name.
```python
from django.contrib.auth.decorators import login_required

@login_required(redirect_field_name='my_redirect_field')
def my_view(request):
    ...
```









