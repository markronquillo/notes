
#### Terminologies I'm not familiar with as of the moment:
Global Interpreter Lock (GIL)
Celery
Green threads/coroutines:
	eventlet
	GEvent

#### Using Production Web Servers
- Gunicorn
    - Supports multiple processes, and eventlet or gevent green threads

- Uwsgi
    - Supports multiple threads, multiple processes and gevent green thread.

- Nginx
    - reverse proxy

#### Scaling with nginx

client --> server -> database

client -> nginx -> server -> database
    client to nginx (is encrypted in https)
    ngixn to server (is not encrypted even in https)

#### Bottlenecks: I/O-bound vs. CPU-Bound

- I/O Bottlenecks
    - scraping links included in pots
    - solution
        - concurrent request handlers through multiple threads, processes or green threads
        - make i/o heavy requests asynchronous

- CPU Bottlenecks
    - rendering of posts
    - make CPU intensive requests asynchronous and offload the CPU heavy tasks auxiliary threads or processes to keep the server unblocked.

#### Asynchronous HTTP Requests
- the request should start the actual task in the background and return.
- Status code in the response shoudl be 202 (Accepted)
- the location header should include a url where the client can ask for status for the asynchronous task.
- requests sent to the status url should continue to return 202 while the backgorudn task is still in progress, The response body can include progress updates if desired
- after the background task is finished, the status url should return the response from the taskA

```python
# synchronous
@api.route('/messages', methods=['POST'])
@token_auth.login_required
def new_message():
    pass

# asynchronous
@api.route('/messages', methods=['POST'])
@token_auth.login_required
@async # added
def new_message():
    pass
```

1:30
