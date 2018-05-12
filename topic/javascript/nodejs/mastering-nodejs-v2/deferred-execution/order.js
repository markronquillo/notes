const fs = require('fs');
const EventEmitter = require('events').EventEmitter;
let pos = 0;
let messenger = new EventEmitter();

messenger.on('message', (msg) => {
	console.log(++pos + ' Message:' + msg);
});

// (A) FIRST
console.log(++pos + ' FIRST');
// (B) NEXT
process.nextTick(() => {
	console.log(++pos + ' NEXT');
})
// (C) QUICK TIMER
setTimeout(() => {
	console.log(++pos + ' QUICK TIMER');
});
// (D) LONG TIMER
setTimeout(() => {
	console.log(++pos + ' LONG TIMER');
}, 10);
// (E) IMMEDIATE
setImmediate(() => {
	console.log(++pos + ' IMMEDIATE');
});
// (F) MESSAGE HELLO!
messenger.emit('message', 'Hello!');
// (G) FIRST STAT
fs.stat(__filename, () => {
	console.log(++pos + ' FIRST STAT');
});
// (H) LAST STAT
fs.stat(__filename, () => {
	console.log(++pos + ' LAST STAT');
});
// (I) LAST
console.log(++pos + ' LAST');


