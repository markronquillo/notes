# Exploring streams

A stream in Node is simpley a sequence of bytes. At any time, a stream contains a buffer of bytes and this buffer has a zero or greater length.

`Node also offer a second type of streams: object streams. Instead of chunks of memory flowing through the stream, an object stream shuttels JS objects`

In general, all stream implementations should follow these guidelines:

- As long as data exists to send, write to a stream until that operation returns `false`, at which point the implementation should wait for a drain event, indicating that the buffered stream data has emptied.

- Continue to call read until a `null` value is received, at which point wait for a readable event prior to resuming reads.


Readable stream must implement a private method `_read`.

Write stream must implement a private method `_write`.

If the write() call returns falls it means that the write stream is full.

The fluid data in a Readable stream can be easily redirected to a Writable stream. For example, the following code will take any data sent by a terminal (stdin is a Readable Stream) and echo it back to the destination Writable stream (stdout): `process.stdin.pipe(process.stdout)`. Whenever a Writable stream is passed to a Readable stream's pipe method, a pipe event will fire. Similarly, when a Writable stream is removed as a destination for a REadble stream the unpip event fires. To remove a pipe, use the following: unpipe(destination stream).


### Duplex streams

A duplex stream is both readable and wriatable. For instance a TCP server created in Node xposes a socket that can be both read form and written to.



