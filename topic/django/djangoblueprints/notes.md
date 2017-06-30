Django Project Blueprints
-------------------------

1. Blueblog - a blogging platform

`workon [environment]`

`django-admin startproject blueblog`

### The contrib packages

The contrib packages are a part of Django that contain some very useful applications that the Django developers decided should be shipped with Django.

`CreateView` generic view.

The `dispatch` method is one of hte most useful methods to override on generic views. It is the first method that is called when the view URL is hit and decides based on the requesty type wheter to call the get or post methods on the view class to process the request. -- Thus if you ever want to have some code that is run on all request types (GET, POST, HEAD, PUT), dispatch is the best method to override.

-- EDIT BLOG POSTS


