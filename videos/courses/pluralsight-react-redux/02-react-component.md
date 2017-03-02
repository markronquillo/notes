React Component Approaches
-----------------------------


#### Introduction

React component creation approaches

Container vs Presentational Components

#### Four ways to create React components

- ES5 -- createClass
- ES6 -- class
- ES5 -- stateless function
- ES6 -- stateless function


```js
// ES5 Class Component
var HelloWorld = React.createClass({
	render: function() {
		return (
			<div> </div>
		)
	}
});

// ES6 Class Components
// no autobind
// PropTypes declared separately
// Default props declared separately
// Set initial state in constructor

constructor(props) {
	super(props);
	this.handleClick = this.handleClick.bind(this);
}


// ES5 Stateless Functional Component
// when you need to declare a componenet that
// doesn't implement its own state, then use this
var HelloWorld = function(props) {
	return (
		<h1> Hello World </h1>
	);
}

// ES6 stateless functional component
const HellowWorld = (props) => {
	return (
		<div>Hello World</div>
	);
}
```

9 Benefits in using stateless functional components:

1. no class keyword
2. Avoid this keyword
3. Enforced best practices (presentational components)
4. High signal-to-noise ratio
5. Enhanced code completion / intellisense
6. Bloated components are obvious
7. Easy to understand
8. Easy to test
9. Performance


When should I use class component? If you need

- State
- Refs
- Lifecycle methods
- child functions (for performance)

When should I use stateless components?

- everywhere else, if you don't need the items above.


#### Container vs Presentation Components

Container:

- Little to no markup -- Do not have to emit DOM
- Pass data and actions down
- Knows about Redux
- Often stateful


Presentaion:
- Nearly all markup
- Receive data and actions via props
- Doesn't know about Redux
- Typecally functional components


Container: Smart, Stateful, Controller View
Presentational: Dumb, Stateless, View

> When you notice that some componetns don't use props they receive but merely forward them down... its a good time to introduce some container components.

#### Summary

