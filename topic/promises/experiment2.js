
function makePromise(name) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            return resolve('complete! ' + name );
        }, 3000);
    });
}

function makeErrorPromise() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject('error');
        }, 1000);
    });
}

var p1 = makePromise("promise1");
var p2 = makePromise("promise2");


p1.then(function(response) {
    console.log(response);
})
.then(function() {
    return p2;
})
.then(function(response) {
    console.log(response);
})
.then(function() {
    return makeErrorPromise();
})
.catch(function(err) {
    console.log(err);
});