/**
 * This experiment generates random timeout value 
 * whoever finishes first will resolve or reject the promise
 */

var p1 = new Promise(function(resolve, reject) {
    const ok = Math.floor(Math.random() * 1000);
    const bad = Math.floor(Math.random() * 1000);

    setTimeout(function() {
        resolve('sample');
    }, ok);

    setTimeout(function() {
        reject('error!');
    }, bad)
});

p1.then(function(response) {
    console.log("Ok wins");
})
.catch(function(response) {
    console.log('aww bad wins');
});
