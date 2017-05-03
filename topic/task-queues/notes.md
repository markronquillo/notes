
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

#### Celery in Production

1. Don't use the databse as your AMQP Broker

2. Use More Queues (not just the default one)

3. Use priority workers

```python
CELERY_QUEUES = (
    Queue('default', Exchange('default'), routing_key='default'),
    Queue('for_task_A', Exchange('for_task_A'), routing_key='for_task_A'),
    Queue('for_task_B', Exchange('for_task_B'), routing_key='for_task_B'),
)

CELERY_ROUTES = {
    'my_taskA': {'queue': 'for_task_A', 'routing_key': 'for_task_A'},
    'my_taskB': {'queue': 'for_task_B', 'routing_key': 'for_task_B'},
}
```

4. Use Celery's error handling mechanisms

5. Use Flower

Monitoring celery tasks and workers

6. Keep track of results only if you really need them

7. Don't pass Database/ORM objects to tasks


### Celery in Production
https://www.caktusgroup.com/blog/2014/09/29/celery-production/

Celery beat - for cronjobs

### 3 Gotchas for Celery

1. You can't spawn processes from within Celery tasks

2. Limitations on argumetns when chaining tasks

3. Tasks stay queued even when there are free workers

```python

ACKS_LATE=True # this ensures that the worker acks the task after it's completed. If the worker crashes, it will just restart.

PREFETCH_MULTIPLIER=1 # this ensures that the worker process can reserve at most one un-acked task at a time. If this is used with ACKS_LATE=False, the worker will reserve a task as soon as it starts processing the first one.

```

