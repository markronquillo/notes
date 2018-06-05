## Creating MovieList View

When Django gets a request, it uses the path of the request and the `URLConf` of hte project to match a request to a view, which returns an HTTP response.

Django views can be either functions, often referred as Function-Based Views or Class-Based VIews.

The advantage of CBV is that Django comes with a rich suite of generic views that you can subclass to easily write views to acommplish common tasks.

**ListView** requires at least a model attribute. It will query for all rows of that model, pass it to the template and return rendered template in a response.

**QuerySet** class is Django's representatio nof a query to the database, it has a number of methods that includes `filter()` (where clause) to limit the result. Queryset is lazy meaning it is not evaluated until we try to get a model out of the QuerySet.

`<app_name>/<model_name>_list.html`


At its simplest, a URLConf is a module with a `urlpatterns` attribute, which is a list of `path` S. A `path` is compsed of a string that describes a string, describing a string, describing the path in question and a callable
