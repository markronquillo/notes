/**
 * Primary file
 */

const http = require('http');
const https = require('https');
const url = require('url');
var fs = require('fs');
var StringDecoder = require('string_decoder').StringDecoder;

var config = require('./config');
var _data = require('./lib/data');
var handlers = require('./lib/handlers');
var helpers = require('./lib/helpers');


// _data.read('test', 'newFile', function(err, data) {
// 	if (!err) {
// 		console.log(data)
// 	} else {
// 		console.log('this was the error', err)
// 	}
// });

// _data.create('test', 'newFile', {'foo' : 'bar'}, function(err) {
// 	console.log('this was the error', err)
// });

var httpServer = http.createServer(function(req, res) {
	unifiedServer(req, res);
});
httpServer.listen(config.httpPort, function() {
	console.log('The server is listening on port ' + config.httpPort);
});
var httpsServerOptions = {
	key: fs.readFileSync('./https/key.pem'),
	cert: fs.readFileSync('./https/cert.pem')
};
var httpsServer = https.createServer(httpsServerOptions, function(req, res) {
	unifiedServer(req, res);
});
httpsServer.listen(config.httpsPort, function() {
	console.log('The server is listening on port ' + config.httpsPort);
});

var unifiedServer = function(req, res) {
		// Get the URL and parse it, query url (true)
	var parsedUrl = url.parse(req.url, true)

	// Get the path
	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g, '');

	var queryStringObject = parsedUrl.query;

	// Get the HTTP method
	var method = req.method.toLowerCase();

	var headers = req.headers;

	// Get the payload, if any
	var decoder = new StringDecoder('utf-8');
	var buffer = '';
	req.on('data', function(data) {
		buffer += decoder.write(data);
	});
	req.on('end', function() {
		buffer += decoder.end();

		// choose the handler this request should go to. If one is not found use the not found handler
		var chosendHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

		var data = {
			trimmedPath: trimmedPath,
			queryStringObject: queryStringObject,
			method: method,
			headers: headers,
			payload: helpers.parseJsonToObject(buffer)
		};

		// Route the request to the handler specified in the router
		chosenHandler(data, function(statusCode, payload) {
			// Use the status code called bac kby the handler, or use 200
			statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

			// use the payload called back by the handler, or default to empty object
			payload = typeof(payload) === 'object' ? payload : {};

			// convert the payload to string

			var payloadString = JSON.stringify(payload);

			// return the response
			res.setHeader('Content-Type', 'application/json');
			res.writeHead(statusCode);
			res.end(payloadString);

		});

		console.log('Request received with this payload ', buffer);
	});

	// Log the request path
	// console.log('Request received on path: ' + trimmedPath) + ' with this ' + method)
	console.log('Headers ' + headers);
}

var router = {
	ping: handlers.ping
}
