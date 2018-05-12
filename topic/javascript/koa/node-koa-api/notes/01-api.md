## Building a RESTful API with Koa and Postgres

### Objectives

- Set up a project with Koa using test driven development
- Write schema migration files with Knex to create new database tables
- Generate database seed files with Knex and apply the seeds to the database
- Set up the testing structure with Mocha and Chai
- Perform the basic CRUD functions on a RESTful resource with Knex methods
- Create a CRUD app, following RESTful best practices
- Write integration tests
- Write tests, and then write just enough code to pass the tests
- Create routes with Koa Router
- Parse the request body with koa-bodyparser

### Project Setup

We install the dependencies

`$ npm install chai-http@3.0.0 --save-dev`
`$ npm install koa@2.3.0 --save`
`$ npm install pg@7.1.2 knex@0.13.0 --save`
`$ npm install knex@0.13.0 -g`

`knex init` -- this will create a knexfile.js 

```
Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use.
```

The knexfile.js contains the database configuration that we'll use in the project.

To create migration type, `knex migrate:make movies`.

```
exports.up = (knex, Promise) => {
  return knex.schema.createTable('movies', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
    table.string('genre').notNullable();
    table.integer('rating').notNullable();
    table.boolean('explicit').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('movies');
};
```

**Project Structure**

```
- src
	|- db
		|- migrations
		|- queries
		|- seeds
		connection.js
	|- routes
		index.js
		movies.js
	index.js
- test
	routes.index.test.js
	routes.movies.test.js
knexfile.js
```

To create the migration run `$ knex migrate:latest --env development`

`$ knex seed:make movies_seed`, this will create a seed file inside  `src/server/db/seeds`, 

To run the seed `$ knex seed:run --env development`

### Routes

`$ npm install koa-router@7.2.1 --save`

Create a folder `routes` inside the server folder. This folder will contain all the route declaration for our app.

The `index.js` file in the routes folder should contain root routes /. Another example is `movie.js`, should contain either /api/movies or /movies endpoints.

```javascript
const Router = require('koa-router');

const router = new Router()
const BASE_URL = `/api/v1/movies`;

router.get(BASE_URL, async (ctx) => {
	try {
		const movies = await queries.getAllMovies();
		ctx.body = {
			status: 'success',
			data: movies
		};
	} catch (err) {
		console.log(err)
	}
})
```

Inside the /server/index.js file, we include the routes by.

```
const indexRoutes = require('./routes/index');
const movieRoutes = require('./routes/movies');
```

### Testing

Inside the /tests, we declare `routes.movies.test.js` file that contains tests for the movies related api.

```javascript
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : movies', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

 	describe('GET /api/v1/movies', () => {
		it('should return all movies', (done) => {
			chai.request(server)
				.get('/api/v1/movies')
				.end((err, res) => {
					should.not.exist(err)
					res.status.should.equal(200)
					res.type.should.equal('application/json')
					res.body.status.should.eql('success')
					res.body.data.length.should.eql(3)
					res.body.data[0].should.include.keys(
						'id', 'name', 'genre', 'rating', 'explicit'
					)
				});
			done()
		})
	})

  afterEach(() => {
    return knex.migrate.rollback();
  });
});
```

