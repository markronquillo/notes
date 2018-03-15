const ELASTICSEARCH = require('elasticsearch');
const CLIENT = new ELASTICSEARCH.Client({
	host: 'locahost:9200',
	apiVersion: '5,0'
});

CLIENT.get({
	index: 'simpsons',
	type: 'episode',
	id: 1,
	_sourceExclude: [
		'video_url',
		'number_in_season',
	],
}, function(err, resp) {
	if (err) {
		console.log(err);
	} else {
		console.log(resp);
	}
});

CLIENT.get({
	index: 'simpsons',
	type: 'episode',
	id: 1,
	_sourceInclude: [
		'title',
	],
}, function(err, resp) {
	if (err) {
		console.log(err);
	} else {
		console.log(resp);
	}
});

CLIENT.get({
	index: 'simpsons',
	type: 'episode',
	id: 1,
	_sourceInclude: [
		'title',
	],
})
.then(function() {
	
});
