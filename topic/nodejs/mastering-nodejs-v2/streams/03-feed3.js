const stream = require('stream');


let Feed = function(channel) {
	let readable = new stream.Readable({

	});
	let news = 'A long headline might go here';

	// in this example, we feed it with all the string value
	// and just read it one char at a time.
	readable._read = () => {
		readable.push(news);
		readable.push(null)
	};
	return readable;
}

let feed = new Feed();

feed.on('readable', () => {
	let character;

	// the read method of a Readable stream can be passed a single
	// argument, indicating the number of bytes to be read from the
	// streams internal buffer.
	// In this example we are reading one byte at a time
	while(character = feed.read(1)) {
		console.log(character.toString());
	}
});
