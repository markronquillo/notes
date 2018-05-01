Restful API

`var parsedUrl = url.parse(req.url, true)`

This parses the request url. The `true` flag means to parse the query params as well. So if the url is http://localhost:8000/foo?test=something, `parsedUrl.query` will have { test: 'something '} object.

#### Get the pathname

```javascript
// Get the path
var = parsedUrl.pathname;
var trimmedPath = path.replace(/^\/+|\/+$/g, '');
```

#### Get the payload

```javascript
var decoder = new StringDecoder('utf-8');
var buffer = '';
// we listen to stream of data
req.on('data', function(data) {
	buffer += decoder.write(data);
});
// after we get the contents of the data
req.on('end', function() {
	// we close the buffer
	buffer += decoder.end();
	console.log('REquest received with this payload ', buffer):
});
```

#### Setting up routes

To setup routes, we can define a routes object that maps a path to a given handler.
```javascript

// we define the handlers here
var handlers = {
	sample: function(code, cb) {}
}

// we add a handler for 404
handlers.notFound = function(code, cb) {

}

var router = {
	sample: handlers.sample
}
```

After we defined the handlers, we need to handle where we call the appropriate handler based on the url path.

```javascript
// we do this insider the request `end` listener
req.on('end', function(statusCode, callback) {
	buffer += decoder.end();


	// choose the handler this request should go to. If one is not found use the not found handler
	var chosendHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

	// we set 
	var data = {
		trimmedPath: trimmedPath,
		queryStringObject: queryStringObject,
		method: method,
		headers: headers,
		payload: buffer
	};

	chosenHandler(data, function(statusCode, payload) {
		// Use the status code called bac kby the handler, or use 200
		statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

		// use the payload called back by the handler, or default to empty object
		payload = typeof(payload) === 'object' ? payload : {};

		// convert the payload to string

		var payloadString = JSON.stringify(payload);

		// return the response
		res.writeHead(statusCode);
		res.end(payloadString);
	});
});
```

### Adding Configuration

We need to make the app to consider config variables based on NODE_ENV.

### Support HTTPS

`openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.epm -out cert.pem`


