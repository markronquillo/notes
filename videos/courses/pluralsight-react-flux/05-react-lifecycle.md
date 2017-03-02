React Life Cycle
-----------------

Props
State
Dynamic child components
Lifecycle functions


#### Props & Statejk

Props - look like HTML attributes, but __immutable__
`this.props.username`


State - Holds __mutable__ state
`this.state.username`

getInitialState() - set default values for states

getDefaultProps() - set default values for props


#### Component Lifecycle Methods

##### componentWillMount() - 

Before initial render, both client and server, Good spot to set initial state.

##### componentDidMount() - 

	After render

	Access DOM, integrate with frameworks, set timers, AJAX requests.

##### componentWillReceiveProps() - 

	When receiving new props. Not called on initial render.

	Set state before a render

##### shouldComponentUpdate() - 

	Before render when new props or state are being received

	not called on initial render. 

	Performance. Return false to avoid unnecessary re-renders

##### componentWillUpdate() - 

	Immediately before rendering when new props or state are being received.
	Not called on initial render.

	Prepare for an update (can't call set state in this function)

##### componentDidUpdate() - 

	After component's updates are flushed to the DOM.
	Not called for the initial render

	Work with the DOM after an update.

##### componentWillUnmount() -

	Immediately before component is removed from the DOM

	Cleanup


### Keys for Dynamic Children

<tr key={author.id}>



### Summary

Props - Pass data to child components, immutable
State - Data in controlelr views, mutable
Lifecycle - Handle bootstrapping and third party integrations



