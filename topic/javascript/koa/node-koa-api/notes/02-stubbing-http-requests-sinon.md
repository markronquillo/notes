## Stubbing Http requests with sinon

### Objectives

- Describe what a stub is and why you would want to use them in your test suites
- Discuss the benefits of using Sinon to stub calls to external services
- Set up a testing structure with Mocha, Chai, and Sinon
- Write full integration tests to call an external service during the test run
- Refactor integration tests to unit tests, stubbing out the external HTTP requests
- Stub each of the CRUD functions from an external service

### What is a stub?

In testing land, a stub replaces real behavior with a fixed version. In the case of HTTP requests, instead of making the actual call, a stub fakes the call and provides a canned response that can be used to test against.

### Sinon setup

`$ npm install sinon@4.1.1 --save-dev`

`$ npm install request@2.83.0 --save-dev`
