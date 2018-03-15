#### Event loop

https://github.com/nodejs/node/blob/master/lib/fs.js


#### Signals

A signal is a limited form of inter-process communication used in Unix, Unix-like and other POSIX-compliant operating systems. It is an asynchronous notification sent to a process, or to a specific thread, within the same process in order to notify it of an event that occurred.

#### Child processes

A fundamenetal part of Node's design is to create or fork processes when parallelizing execution or scaling a system, as opposed to creating a thread pool

```javascript
let cp = require('child_process');
let child = cp.fork(__dirname + '/lovechild.js');
```

#### File events

Node allows developers to register for notifications on the file events through the `fs.watch` method. The watch method broadcasts changed events on both files and directories.

```javascript
fs.watch('file or directory', {}, callback)
```

### Deferred execution

`process.nextTick` delays execution of its callback function until some point in the future. The primary use of `nextTick` in a function is to postpone the broadcast of result events to listeners on the current execution stack until the caller has had an opportunity to register event listeners, giving the current executing program a chance to bind callbacks to `EventEmitter.emit` events.


`setImmediate`: Node will actually run the function you give to nextTick before the one you pass to setImmediate.






