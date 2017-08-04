# Flask Configurations

In Flask, a configuration is done on an attribute named `config` of the Flask object.

```python
app = Flask(__name__)
app.config['DEBUG'] = True
```

If you want to store all your configuration in another file and load it ing your flask app instantiation.

```python
# From a python configuration file:
app.config.from_pyfile('myconfig.cfg')

# From an object, the configuration can be fetched using
app.config.from_object('myapplication.default_settings')

# alternatively, we can also use
app.config.from_object(__name__)

# from the environment variable, the configuration can be fetched using
app.config.from_envvar('PATH_TO_CONFIG_FILE')
```

To implement a class based config

```python

```


