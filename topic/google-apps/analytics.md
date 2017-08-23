# Fundamentals 

_https://developers.google.com/analytics/devguides/collection/analyticsjs/_

Adding analytics to the site is as easy as copying and pasting the snippet code into our website. The code will load the global function `ga`. Interacting with google analytics will mainly revolve around this function.

The global `ga` function has an array property `q` where it queues all the commands to be triggered.


## Creating Trackers

`Tracker objects` are objects that can collect and store data and then send that data to Google Analytics.

When creating a new tracker:

- specify `tracking ID` (UA-XXXX-Y) - All collected data is associated with this ID.

- `cookie domain` - which is set to auto.

When its time to send data to Google Analytics, different information like page title, URL and device information are stored on the tracker as well and gets sent.

### The create method: 

`ga('create', 'UA-XXXX-Y', 'auto')`

### Working with multiple trackers

To track data for two separate properties, you need to create two separate trackers, and at least on of the mmust be a named tracker.

```javascript
ga('create', 'UA-XXXX-Y', 'auto');
ga('create', 'UA-XXXX-Z', 'auto', 'clientTracker);
```

### Running commands for a specific tracker

To run analytics commands for a specific tracker, you prefix the command name with the tracker name, followed by a dot. When you don't specify a tracker name, the command is run on the default tracker.

```javascript
ga('send', 'pageview');
ga('clientTracker.send', 'pageview');
```

## Getting and Setting Tracker Data

You have to wait for the tracker to be created before referencing to it. You can do this via the `ready callback`.

The `ready callback` is a function that you can add to the `ga()` command queue. The function will be invoked as soon as the analytics.js library is fully loaded and all previous commands added to the queu have been executed.

The technique is to add the `ready callback` to the queue after the `create` commands.

```javascript
ga('create', 'UA-XXXXX-Y', 'auto');

ga(function(tracker) {
  // Logs the tracker created above to the console.
  console.log(tracker);
});
```

There are various commands that you can call to work with the `tracker` object.


> Note: tracker objects do not update themselves. If a user changes the size of the window, or if code running on the page updates the URL, tracker objects do not automatically capture this information. In order for the tracker object to reflect these changes, you must manually update it.


## Sending Data to Google Analytics

```javascript
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
```

When a tracker sends data to Google Analytics it's called sending a `hit` and every hit must have a hit type. Hit types include `pageview`, `screenview`, `event`, `transaction`, `item`, `social`, `exception`, `timing`. 

# Tracking and Common user interactions

## Page Tracking

Page tracking allows you to measure the number of views you had for a particular page on your website. 

-- READ page and event tracking