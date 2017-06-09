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
	var result;

  fakeAjax(file, function(response) {
  	result = function() {
  		return response;
  	}
  });

  return function(cb) {
  	var checkResult = function() {
  		if (typeof result !== 'function') {
  			setTimeout(function() {
  				checkResult();
  			}, 1000);
  		} else {
  			cb(result());
  		}
  	}
  	checkResult();
	}
}

var file1Thunk = getFile("file1");
var file2Thunk = getFile("file2");
var file3Thunk = getFile("file3");

file1Thunk(function(file1) {
  output(file1);
  file2Thunk(function(file2) {
    output(file2);
    file3Thunk(function(file3) {
      output(file3);
    });
  });
});
