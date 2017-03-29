### Cookies vs Tokens

Cookie 

- Automatically included on all requests
- Unique to each domain
- Cannot be sent to different domains


Token

- Have to manually wire up
- Can be sent to any domain


### JWT Overview

When signing up or signing in, give a token in exchange for an id:

User ID + Our Secret String = JSON Web Token

In the future, when a user makes an authenticated requeset they should include their JWT:

JSON Web Token + Our Secret String = UserId


### Passport Strategies

Passport (passport.js) is what we use to authenticate users.

Passport Strategy (approach) is the approach that we do to authenticate the user.

1. Verify a user with a JWT. -- we used this in this project (passport-jwt)
2. Verify user with username and password.