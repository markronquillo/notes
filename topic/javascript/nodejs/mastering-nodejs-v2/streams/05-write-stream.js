const stream = require('stream')

let writable = new stream.Writable({
	decodeStrings: false
})

writable._write = (chunk, encoding, callback) => {
	console.log(chunk.toString());
	callback();
}

let written = writable.write(Buffer.alloc(32, 'A'));
// let written = writable.write(Buffer.alloc(16384, 'A'));
writable.end();

console.log(written);