const fs = require('fs');
const Twit = require('twit');

const tweetSize = 140;

let twit = new Twit({
	consumer_key: 'QP2lRjw76sREYFZFPj7VJ3Ij1',
	consumer_secret: 'lTFjYup4EPgyEhcrcTSfQjda1gQQaKZx78xydRqXXjMSdZApoJ',
	access_token: '796085234-3YUOlGVQo5VKm2eWVxb5uIKNalBRAZprJeXboQ5y',
	access_token_secret: 'lpZuEvSyrtaEV237LS89ayaTlN9YgEafUYkqpgyIX7FiT'
});

let tweetFile = 'tweets.txt'

let writeStream = fs.createWriteStream(tweetFile, {
	flags: 'a'
});

let cleanBuffer = function(len) {
	let buf = Buffer.alloc(len);
	buf.fill('\0')
	return buf
}

let check = function() {
	twit.get('search/tweets', {
		q: '#nodejs since:2013-01-01'
	}, (err, reply) => {
		let buffer = cleanBuffer(reply.statuses.length * tweetSize);
		reply.statuses.forEach((obj, idx) => {
			buffer.write(obj.text, idx*tweetSize, tweetSize);
		});
		writeStream.write(buffer);
	});
	setTimeout(check, 10000);
}

check();
