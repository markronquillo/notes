React Core Concepts
--------------------

Why React?

Fast 				-- Virtual DOM
Composable 			-- Components and nested Components
Pluggable			-- View Layer
Isomorphic Friendly -- can be rendered in both server and client, doesn't need DOM
Simple				-- easy to learn
Battle Proven


#### React and MVC


#### The risk of Two-Way Binding

Unpredictable

Cascading updates

Tricky debugging

#### JSX 

HTML in JavaScript

Differences: className, htmlFor

Compiles to JavaScript

JSX Compiles to JS  -- `React.createElement('h1', {color: 'red'}, 'Heading here');`


#### Virtual DOM

Compared Current to Desired

Updating the DOM is expensive

Virtual DOM - Abstraction of the DOM

Without Virtual DOM
- Blindly update DOM
- using new state


With Virtual DOM
- Compare DOM's current state to desired new state.
- Update the DOM in the most efficient way.


Go even faster: 
should Component Update
PureRendermixin + immutability

More than Performance
Synthetic Events
Isomorphic Support
React Native
 
