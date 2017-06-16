
function getImage(callback) {
    var url = "http://lorempixel.com/200/200/cats/";
    return fetch(url, { mode: cors });
}

/**
 * Attach an event onload
 * This will automatically fetch an image and display in our popup html.
 */
document.addEventListener('DOMContentLoad', function() {
});