var p1 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        return resolve("test");
    }, 2000);
});

/**
 * Given the code below, it is possible to call 
 * a series of `then` functions even if you don't
 * have any response to handle. Using this idea,
 * we can call a then function to return a new promise
 * that we want to handle in the next `then` function call
 */

p1.then(function(response) {
    console.log(response)
})
.then(function(response) {
    console.log(response);
}) .then(function(response) {
    console.log(response);
    return new Promise(function(resolve, reject) {
        resolve("meron!");
    });
})
.then(function(response) {
    console.log(response);
})
;