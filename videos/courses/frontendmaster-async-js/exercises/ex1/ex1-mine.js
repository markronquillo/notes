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
	}, randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

var responses = {
	"file1": null,
	"file2": null,
	"file3": null,
}

function getFile(file) {
	fakeAjax(file,function(text){
		responses[file] = text;

		// what do we do here?
		var keys = Object.keys(responses);
		for(var x=0; x < keys.length; x++) {
			if (responses[keys[x]] !== null)	{
				output(responses[keys[x]]);
				delete responses[file];
			} else {
				return;
			}
		}
	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
