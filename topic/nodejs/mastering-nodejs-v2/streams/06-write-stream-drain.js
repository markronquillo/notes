const stream = require('stream');

let writable = new stream.Writable({
	highWaterMark: 10, // the max number of bytes the stream's buffer will accept prior to returning false on writes. default 16kb
	decodeStrings: true // whether to convert strings into buffers before writing; default true
});

writable._write = (chunk, encoding, callback) => {
	process.stdout.write(chunk);
	callback();
}

function writeData(iterations, writer, data, encoding, cb) {
	(function write() {

		// we will end after n iterations
		if (!iterations--) {
			return cb()
		}

		// the idea is that to wait for the drain event to occur
		// prior to sending more data if the highWaterMark is reached
		if (!writer.write(data, encoding)) {
			console.log(` <wait> highWatermark of ${writable.writableHighWaterMark} reached`);
			writer.once('drain', write);
		}
	})()
}

writeData(4, writable, 'String longer than highWaterMark', 'utf8', () => console.log('finished'));

