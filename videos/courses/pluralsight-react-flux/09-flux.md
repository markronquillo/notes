Flux
-----

A pattern, unidirectional data flows.

Centralized dispatcher.

Two-way binding vs Unidirectional

Two-way binding ---- View-Model <-> Model

Unidirectional ----- Action -> Dispatcher -> Store -> ReactView

#### 3 Parts

Action: 
- describes an 'action' that happened
- actions are handled by dispatcher

Dispatcher: (Singleton Registry)  
- Notify everyone who cares
- Makes call to stores
- centralized list of callbacks

Store:
- Hold application data

ReactView:
- 


#### Actions

Encapsulate events
Triggerd by user interactions and server
Passed to dispatcher

Actions are triggered normally from the
1. User interface
2. Server (Page load)

Payload
{
	type: USER_SAVED
	data: {
		firstName: 'Cory',
		lastName: 'House'
	}
}

#### Dispatcher

Central Hub - Singleton - only one dispatcher per app
Holds list of callbacks - This dispatches actions
Broadcasts payload to registered callbacks.
Send actions to stores

Constants:
Keeps things organized


#### Store

Holds app state, logic and data retrieval 
Not a model - except it contains models
One or many 
Registers callbacks with dispatcher
Uses Node's EventEmitter

The Structure of a Store:

Every store has common traits (interface)

1. Extend EventEmitter
2. addChangeListener and removeChangeListener
3. emitChange

> As an application grows, the dispatcher becomes more vital, as it can be used to manage dependencies between the stores by invoking the registered callbacks in a specific order. Stores can declaratively wait for other stores to finish updating, and the update themselves accordingly.


#### Controller Views

Controller views are Top level component that contains child components.
Interacts with Stores
Holds data in state
Sends data to children as props

Single top controller view per page, this means that the children components only receive data as props.

Controller views are the views that should interact with our Flux stores.



#### Flux flow in detail

Action -> user clicked 'save user' button
Send Action Payload - payload sent to dispatcher (type, data)

Dispatcher - Checks for registered callbacks to determined which stores should receive the payload
Send Action Payload - Sends payload to all registered callbacks

Store - Received payload
Updates storage and fire change event

React View

#### Quick chat with flux

React: Hey CourseAction, someone clicked this 'Save Course' button

Action: Thanks React! I registered an action creator with the dispatcher, so the dispatcher should take care of notifying all the stores that care.

Dispatcher: Let me see whocares about course being saved. Looks liek the CourseStore has registerd a callback with me, so I'll let her know.

Store: Hi dispatcher! Thanks for the update! I'll update my data with the payload you sent. Then I'll emit an event for the React components that care.

React: Ooo! Shiny new data from the store I'll update the UI to reflect this.


#### Flux API

register(function callback)) - "hey dispatcher, run me when actions happen - Store"

unregister(string id) - "hey dispatcher, stop worrying aobut this action - Store"

waitFor(array<strings> ids) - "Update this store first - Store"

dispatch(object payload) - "Hey dispatcher, tell the stores about this action - Action"

isDispatching() - "Boolean that checks if dispatcher is busy"

So flux is a publish-subscribe model?

Differs in two ways;
1. Every payload is dispatched to all registered callbacks.
2. Callbacks can wait for other callbacks.

 
#### Summary


Flux is a pattern for unidirectional data flows
Actions encapsulate envets
Dispatcher is a central hug that holds callbacks
Stores hold app state

