RSS Reader

An RSS feed reader will server as an example on how to fetch external data, store it, and display it to the user.

High level tasks:
- add a rss feed link
- read the feed links
- display the webpage in a view when clicked

We will learn:

- State management with MobX
- Fetch external data from a URL
- WebView
- Basic linking modules with native resources
- Adding icons
- ActivityIndicator

For this app, we'll need a to tal of four screens:

- FeedList: this is a list containing the titles for hte feeds which were added to the app sorted by the time they were added.

- AddFeed: This is a simple form to allow the user to add a feed by sending its URL. We will here retrieve the feed details to finally add and save them in our app for later usage.

- FeedDetail: Thsi is a list containing the latest entries (retrieved before mounting the screen) belonging to the selected feed.

- EntryDetail: This is a WebView showing the contents of the selected entry.

## Managing our state with MobX

`anything that can be derived from the application state, should be derived automatically`

`@observable` meaning that any component can subscribe to it and be notified every time the value is changed.


