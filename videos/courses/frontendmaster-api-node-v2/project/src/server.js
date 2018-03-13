import express from 'express';
import setupMiddleware from './middleware';
import { restRouter } from './api'
import { connect } from './db'
import { signin, protect } from './api/modules/auth'

const app = express()

setupMiddleware(app)
connect()

app.use('/signin', signin);

app.all('*', (req, res) => {
	res.json({ ok: true })
});
