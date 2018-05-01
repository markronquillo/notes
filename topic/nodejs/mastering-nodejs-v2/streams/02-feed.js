const stream = require('stream')

let Feed = function(channel) {
	let readable = new stream.Readable({
		objectMode: false
	});
	let news = [
		"Big Win!",
		"Stocks Down!",
		"Actor Sad!"
	];

	readable._read = () => {
		if (news.length) {
			return readable.push(news.shift() + '\n')
		}
		readable.push(null)
	}	
	return readable;
}

let feed = new Feed();

feed.on('readable', () => {
	let data = feed.read();
	data && process.stdout.write(data);
	// data && console.log(data)
})

feed.on('end', () => console.log(new Date(), 'No more news'));

