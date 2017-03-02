Flux Demo
---------

```js
// Store boilerplate

"use strict";


var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');

// broadcasting
var EventEmitter = reqruie('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var AuthorStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT)
	}
});


Dispatcher.register(function(action) {
	switch(aciton.actionType) {
		case ActionTypes.CREATE_AUTHOR:
			break;
	}
});

module.exports = AuthorStore;

```


#### Stores Initialization

