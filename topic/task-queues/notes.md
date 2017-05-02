
## Celery

We can use Celery to spawn workers (consumers) that process the tasks in RabbitMQ (broker/queue). A separate app or script is a producer that queues tasks in RabbitMQ.


#### 4 minute guide to Celery

- Run a new RabbitMQ container `docker run --name myrabbitmq -P -d rabbitmq`.
- Create a new python file (our producer) that has a function wrapped in the `@app.task` decorator
- Run celery workers by `celery worker -A task -l INFO` 
- Open ipython, load your decorated function and run `func.delay()` to queue the task.


#### Miguel Grinberg Flask + Celery
https://blog.miguelgrinberg.com/post/using-celery-with-flask

Celery is initialized by creating an object of class Celery, and passing the application name and the connection URL for the message broker.

```python
from flask import Flask
from celery import Celery

app = Flask(__name__)
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)
```

`CELERY_BROKER_URL` - tells where the broker service is running.
`CELERY_RESULT_BACKEND` - is only necessary if you need to have Celery store status and results from tasks.

Two ways to defer task execution and put it in the queue.

- `task.delay(10, 20)`
- `task.apply_async(args=[10, 20], countdown=60)`

celery worker -A app.celery --loglevel=info
