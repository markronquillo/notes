## Chapter 2: Writing test functions

Smoke tests are by convention not all-inclusive, through test suits, but a select subset that can be run quickly and give a developer a decent idea of the health of all parts of the system. `@pytest.mark.smoke` -- You can actually mark tests using any term and use `pytest -m 'term'` to run those tests only.

Using `-m 'smoke'` runs both tests marked wit h`@pytest.mark.smoke`.

Additionally, we can run the test by `pytest -v -m 'smoke and not get'`.







