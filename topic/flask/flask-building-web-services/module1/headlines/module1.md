# Module 1

- routing from URLs to resources
- inserting dynamic data into HTML


### Introduction to RSS and RSS feeds

RSS presents content in an ordered and structured format using XML. 

`pip install --user feedparser`

The `flask.request` object is a global context which our code can use to access information about the latest request made to our application.

`http://flask-cn.readthedocs.org/en/latest/reqcontext/`

### Adding weather and currency data

`https://home.openweathermap.org/users/sign_up`

### Retrieving and parsing JSON in Python

`import json, urllib2, urllib`


### Currency: Getting an API key for Open Exchange Rates API

`openexchangerates.com`

### Using cookies with Flask

```python
import datetime
from flask import make_response

response = make_response(render_template('home.html',
    articles=articles
    ...),
    expires=datetime.datetime.now() + datetime.timedelta(days=365),
    response.set_cookie('publication', publication, expires=expires)
    response.set_cookie('city', city, expires=expires)
    response.set_cookie('currency_from', currency_from, expires=expires)
    response.set_cookie('currency_to', currency_to, expires=expires)
    )
```

```python
# retrieving cookies in Flask
request.cookies.get('publication')
```



