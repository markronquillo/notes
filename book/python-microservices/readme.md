### - Flask related

```python
with.app.app_context():
   pass 
```

### Background tasks

Fetch new runs from Strava to add them in the Runnerly database hourly.

Monthly report can be called once per month that generate a report and send it to the user by email.

### Splitting the monolith

The first thing that we can split into services in our current setup is the background task that uses `Celery` and `Redis`. 
But since this tasks is tied up with our Flask application, we have to deploy the whole Flask application in the new server where
we will run the background services. This is an overkill since for that server we only want to run a certain part where it deals 
with the background tasks.

What we can do is, we completely separate these codes. We can make python scripts that uses celery instead for this. We’ll remove it
completely from Flask app.

Strava Service: 
Reports Service:
Data Service
