### HTTP in Node

- node comes with a built in module for creating network based apps.
- just a library, not a framework
- good luck
- you still need to develop abstractions around http module to build serveres


### Node Server Frameworks

- connect
- express
- koa
- hapi
- sails

### Features of express

- Declarative routing: Exact, pattern, glob, parameter matching
- Middleware: functions to run serially on your requests
- Powerful response options
	- From JSON to stsatic files
	- Stream
	- Redirects
- DB agnostic
- Highly configurable


```javascript
const express = require('express')

const app = express()

app.get('/', (req, res) => {
	res.json({ ok: true })
})

app.listen(3000, () => {
	console.log('Listening in port ' + 3000);
})
```

### Webpack related

Webpack allows you to define externals - modules that should not be bundled.

** I left off trying to get my project started as soon as possible


