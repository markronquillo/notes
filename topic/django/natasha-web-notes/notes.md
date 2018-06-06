## Django

## DRF

## Pytest

@pytest.mark.django_db - decorator
 - This is used to mark a test function as requiring the database. It will ensure the database is set up correctly for the test. Each test will run in its own transaction which will be rolled back at the end of the test. This behavior is the same as Django’s standard django.test.TestCase class.

 
