React Router
------------


Nested views map to nested routes
Declarative


## Route Configuration

Route - Declarative map a route
DefaultRoute - For URL of '/' like index.html
NotFoundRoute - Client-side 404
Redirect - Redirect to another route

Recall: I've included react-router instead of just relying on my custom router codes. I've created a routes.js file that contains all the Route definition for the application. I've removed most of the codes in the main.js and I've implemented the boilerplate code for react router.


## Params and QueryStrings

<route path='/course/:courseId' handler={Course} />

// /course/clean-code?module=3

```
var Course = React.createClass({
	render: function() {
		this.props.params.courseId; // clean-code
		this.props.query.module; // 3
		this.props.path; // /course/clean-code?module=3
	}
})

```


## Links

We can reference to our routes using the route name and create a link that points/redirects to it.

URL: /user/1
Route: <route name="user" path="/user/:userId" />
JSX: <Link to="user" params={{userId: 1}}>Bobby Tables </Link>


## NotFoundRoute


```javascript
/*
	This is a boilerplate for the react router.
	This loads all the routes defined in the routes.js file and
	loads the corresponding router based on the current url.
*/
"use strict";


var React = require('react');
var Router = require('react-router');
var routes = require('./route');

Router.run(routes, function(Handler) {
	React.render(<Handler />, document.getElementById('app'));
});
```

This is how we define routes for our react application.

```javascript
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
	// path="about-us" to define the path instead of the name value
	<Route name="app" path="/" handler={require('./components/app')}>
		<DefaultRoute handler={require('./components/homePage')} />
		<Route name='authors' hander={require('./components/authors/authorPage')} />
		<Route name='about' hander={require('./components/about/aboutPage')} />
		<NotFoundRoute handler={require('./components/notFoundPage')} />
	</Route>
);

module.exports = routes;
```


### Redirects

Its common to retire old links.

```jsx
var Redirect = Router.Redirect;

<Redirect from="old-path" to="name-of-the-new-path" />
```


### Handling Transitions

willTransitionTo -- Determine if page should be transitioned to.

willTransitionFrom -- Run checks before user navigates away.


### Locations

Hash Location /#/courses
- Ugly urls
- works in all browsers
- not compatible with server rendering

History Location  /courses -- HTML5 
- clean urls
- IE10+

```jsx
// in main.js


Router.run(routes, Router.HistoryLocation, function(Handler) {
	React.render(<Handler />, document.getElementById('app'));
});
```


### Mixins

For cross-cutting concerns
Share code between multiple components

NavigationMixin: programmatically move to a new route.
- this.transitionTo('contact')
- this.replacewith('contact')
- this.goBack
- makePath(routeName, params, query)


```
var ManageAuthorPage = React.createClass({
	mixins: [ Router.Navigation, Router.State ]	
});
```


### Summary

Declarative routing configuration
Params and querystrings

