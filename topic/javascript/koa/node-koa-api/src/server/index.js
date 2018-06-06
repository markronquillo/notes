const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const RedisStore = require('koa-redis');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');

const app = new Koa();
const PORT = process.env.PORT || 1337;

// sessions
app.keys = ['super-secrect-key'];
app.use(session({
	store: new RedisStore()
}, app));

// body parser
app.use(bodyParser())

// authentication
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

app.use(indexRoutes.routes())
app.use(authRoutes.routes())
app.use(movieRoutes.routes())

const server = app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
