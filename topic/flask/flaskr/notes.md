


Define the environment variable `FLASKR_SETTINGS` that points to a config file to be loaded. `app.config.from_envvar('FLASKR_SETTINGS', silent=True)` 

`python install --editable .`

## Step 4: Database Connections

Flask provides two context: the `application context` and the `request context`. The `request` variable is the request object associated with the current request, whereas `g` is a general purpose variable associated with the current applicatoin context.

Functions marked with `@app.teardown_appcontext` are called everytime the app context tears down.

## Step 5: Creating the database

The `@app.cli.command('initdb')` decorator reigsters a new command with the flask script. Flask creates an application context which is bound to the right application, within the function, you can access `flask.g` etc.

Make sure you run this before running the flask command
```
export FLASK_APP=flaskr
export FLASK_DEBUG=true
```

## Step 6: The View Functions

## Testing Flask Applications

Testing Tricks

```python
app = flask.Flask(__name__)
with app.test_request_context('/?name=Peter'):
    pass
```

Application Factories,

`app.preprocess_request()`

`app.process_response(resp)`

### Faking Resources and Context

A common pattern in flask is to store user authorization information adn database connection on the application context or the `flask.g` object.





