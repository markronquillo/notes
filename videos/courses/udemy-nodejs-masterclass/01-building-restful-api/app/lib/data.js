
var fs = require('fs');
var path = require('path');

var lib = {};

lib.baseDir = path.join(__dirname, '/../.data/');

lib.create = function(dir, file, data, callback) {
	// open the file for writing
 	fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function(err, fileDescriptor) {
 		if (!err && fileDescriptor) {
 			// convert data to string
 			var stringData = JSON.stringify(data);
 			console.log(stringData);
 			fs.writeFile(fileDescriptor, stringData, function(err) {
 				if (!err) {
 					fs.close(fileDescriptor, function(err) {
 						if (!err) {
 							callback(false)
 						} else {
 							callback('Error closing new file');
 						}
 					});
 				} else {
 					callback('Error writing to new file');
 				}
 			});

 		} else {
 			callback('Could not create new file, it may already exists.');
 		}
	})
}

lib.read = function(dir, file, callback) {
	fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function(err, data) {
		callback(err, data);
	});
}

lib.update = function(dir, file, data, callback) {
	// Open the file for writing
	fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function(err, fileDescriptor) {
		if (!err && fileDescriptor) {
			var string = JSON.stringify(data);

			fs.truncate(fileDescriptor, function(err) {
				if (!err) {
					fs.writeFile(fileDescriptor, stringData, function(err) {
						if (!err) {
							fs.close(fileDescriptor, function(err) {
								if (!err) {
									callback(false);
								} else {
									callback('Error closing');
								}
							})
						} else {
							callback('Error writing to existing file.');
						}
					})
				} else {
					callback('Error truncating file');
				}
			})
		} else {
			callback('Could not open the file for updating, it may not exist yet.');
		}
	});
}

lib.delete = function(dir, file, callback) {
	// unlink the file
	fs.unlink(lib.baseDir + dir + '/' + file + '.json', function(err) {
		if (!err) {
			callback(false)
		} else {
			callback('Error deleting file');
		}
	})
}

module.exports = lib;