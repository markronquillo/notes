
> You should keep an eye on all your mocks as the projects grows, and make sure they are note the only kind of tests that cover a particular feature.


## Functional tests

Functional tests for a microservice project are all the tests that interact with the published API by sending HTTP requests and asserting the HTTP response.

The two most important kind of functional tests we should focus on are these:
- Tests that verify that the applciation does what it was built for.
- Tests taht ensure an abnormal behavior that was fixed is not happening anymore.

