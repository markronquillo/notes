## User Authentication with Passport and Koa

Passport is a library that provides a simple authenticate middleware for Node.js.

### Objectives

- Discuss the overall client/server authentication workflow
- Add Passport and passport-local to a Koa app
- Configure bcrypt.js for salting and hashing passwords
- Practice test driven development
- Register and authenticate a user
_ Utilize sessions to store user information via koa-session
_ Explain why you may want to use an external session store to store session data
- Set up an external session store with Redis
- Render HTML pages via server-side templating

### User Model

`knex migrate:make user`

`knex migrate:latest --env development`

`npm install koa-passport@4.0.1 --save`

`npm install koa-session@5.5.1 --save`

`npm install passport-local@1.0.0 --save`

`npm install bcryptjs@2.4.3 --save`

###  Redis Session Store

`npm install koa-redis@3.1.1 --save`


