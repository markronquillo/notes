## Promise 

_https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise_

`new Promise( /* executor */ function (resolve, reject) { ... } );`

The executor function (the callback we pass in instantiating a Promise) is called __immediately__ by the Promise implementation passing the built-in `resolve` and `reject` function.


A _Promise_ is a proxy for a value not necessarily known when the promise is created.

A Promise is in one of these states:

1. pending
2. fulfilled
3. rejected


`Promise.prototype.then()` and `Promise.prototype.catch()` returns promises so that they can be chained.

---------

## Web Fundamentals: JS Promises introduction

_https://developers.google.com/web/fundamentals/getting-started/primers/promises_


At the very basic, promises are a bit like event listeners except:

    1. A promise can only succeed or fail once. It cannot succeed or fail twice, neither can it switch from scucess to failure or vice versa.

    2. If a promise has succeeded or failed and you later add success/failure callback, the correct callback will be called even though the event took place earlier.

Casting jquery deferreds to promises:
`var jsPromise = Promise.resolve($.ajax('/whatever.json'));`

In the example code below, we only fetch the story json once, and whenever we try to get the a chapter it refers to the cached value.

```javascript
function getJSON(url) {
    return get(url).then(JSON.parse);
}

var storyPromise;

function getChapter(i) {
    storyPromise = storyPromise || getJSON('story.json');

    return storyPromise.then(function(story) {
        return getJSON(story.chapterUrls[i]);
    });
}

getChapter(0).then(function(chapter) {
    console.log(chapter);
    return getChapter(1);
}).then(function(chapter) {
    console.log(chapter);
});
```

Rejections happen when a promise is explicitly rejected, but also implicitly if an error is thrown in the constructor callback.

```javascript
getJSON('story.json')
.then(function(story) {
    return getJSON(story.chapterUrls[0]);
})
.then(function(chapter1) {
    addHtmlToPage(chapter1.html);
})
.catch(function() {
    addTextToPage('Failed to show chapter');
})
.then(function() {
    document.querySelector('.spinner').style.display = 'none';
});
```

#### Parallelism and sequencing: getting the best of both

Problem:

We need to fetch a series of data, stored in an array. One solution is that we loop through that array of `to fetch` data and create a fetch promise on each of the data (url). But the problem with this solution is that we cannot (or it is hard) to handle each of the data in order.

Solutions

Creating a sequence, we want to turn our list of `urls` into a sequence of promises. We can do that using then()

```javascript
var sequence = Promise.resolve();
story.chapterUrls.forEach(function(chapterUrl) {
    sequence = sequence.then(function() {
        return getJSON(chapterUrl);
    })
    .then(function(chapter) {
        addHtmlToPage(chapter.html);
    });
});
```

This will create `sequence1 (then) sequence2 (then) ... (then) sequencen`







