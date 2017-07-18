import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import falcor from 'falcor'
import falcorExpress from 'falcor-express'
import falcorRouter from 'falcor-router'

import routes from './routes.js'


const app = express()
app.server = http.createServer(app)

app.use(cors())

app.use(bodyParser.json({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))

let cache = {
    articles: [
        {
            id: 987654,
            articleTitle: 'Lorem ipsum - article one',
            articleContent: 'here goes the content of the article'
        },
        {
            id: 123456,
            articleTitle: 'Lorem ipsum - article two',
            articleContent: 'Sky is the limit, the content goes here'
        },
    ]
}
var model = new falcor.Model({
    cache: cache
})

app.use('/model.json', falcorExpress.dataSourceRoute((req, res) => {
    return new falcorRouter(routes)
}))
app.use(express.static('dist'))

app.get('/', (req, res) => {

    Article.find( (err, articlesDocs) => {
        const ourArticles = articlesDocs.map( (articleItem) => {
            return `<h2${articleItem.articleTitle}</h2>
            ${articleItem.articleContent}`
        }).join('<br />')

        res.end(`<h1> Publishing App Initial Application! </h1> ${ourArticles}`)
    })
})

app.server.listen(process.env.PORT || 3000)
console.log(`Started on port ${app.server.address().port}`)

export default app
