var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('This is my FB Messenger bot - who is off bot server');
});

app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === 'whosoffbot_verify_token') {
        res.status(200).send(req.query['hub.challenge']);
    } else {
        res.status(403).send('Invalid verify token');
    }
});

app.listen((process.env.PORT || 8080));
