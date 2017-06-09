function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	// what do we do here?
	return ASQ(function(done) {
		fakeAjax(file, done);
	});
}

// request an array of files at once in "parallel"
// ???

var asq1 = getFile("file1");
var asq2 = getFile("file2");
var asq3 = getFile("file3");

asq1.then(function(done, file) {
	output(file);
})