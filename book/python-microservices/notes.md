## Discovering Flask

The framework entry point is the Flask class in the `flask.app` module

#### Routing: Flask creates the Map class

The routing happens in `app.url_map`, which is an instance of Map class. That class uses reuglar expressions to determine if a function deocrated by @app.route matches the incoming request.


```python
@app.route('/api', methods=['POST', 'DELETE', 'GET'])
def function_here():
    ...

```

OPTIONS and HEADS methods are implicitly added in all rules.


Variables and converters

```python
@app.route('/api/person/<person_id>')
def person(person_id):
    ...
```

If you have several routes that match the same URL, the mapper uses a particular set of rules to determine which one it calls. This is the implementation description taken from the routing module:

1. Rules without any arguments come first for performance. This is because we expect them to match faster and some common rules usually don't have any arguments
2.  The more complex rules come first, so the second argument is the negative length of the number of weights.
3. Lastly, we order by the actual weights.


There is also basic converter taht will convert the variable to a partiular type -- `<int:variablename>`.


You can also create your own custom converter, like  if you wan to match users' ID with usernames, you could create a converted that looks up a database and convertes the integer to a username.

```python
from flask import Flask, jsonify, request
from werkzeug.routing imoprt BseConverter, ValidationError

_USERS = {'1': 'Taerk', '2': 'Freya'}
_IDS = {val: id for id, val in _USERS.items()}

class RegisteredUser(BaseConverter):
    def to_python(self, value):
        if value in _USERS:
            return _USERS[value]
        raise ValidationError()

    def to_url(self, value):
        return _IDS[value]
```

`from flask import url_for`
`url_for('person', name='Tarek'))`



#### Request: Flask passes a Request object to the view.

When a request comes in, Flask calls the view inside a thread-safe block and uses Werzeug's local helper.

This helper does a job similar to Python's `threading.local` and makes sure that each thread has an isolated environment.



#### Response: A Response object is sent back with the response content.


