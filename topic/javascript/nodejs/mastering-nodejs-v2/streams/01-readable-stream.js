const stream = require('stream');

let readable = new stream.Readable({
	encoding: 'utf8', // decode buffers into the specified encoding
	highWaterMark: 16000, // number of bytes to keep in the internal buffer before ceising to read from the data source: default 16kb
	objectMode: true // tell the stream to behave as a stream of objects, instead of stream of bytes; default false
});


