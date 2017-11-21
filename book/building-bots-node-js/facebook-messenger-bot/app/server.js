var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.send('This is my FB Messenger bot - who is off bot server');
});

app.get('/webhook', function(req, res) {
    var events = req.body.entry[0].messaging;

    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            sendMessage(event.sender.id, { text: "Echo: " + event.message.text });
        }
    }

    res.sendStatus(200);

    // if (req.query['hub.verify_token'] === 'whosoffbot_verify_token') {
    //     res.status(200).send(req.query['hub.challenge']);
    // } else {
    //     res.status(403).send('Invalid verify token');
    // }
});

function sendMessage(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.11/me/messages',
        qs: {
            access_token: 'EAAFOaEkeNS8BAPZA0ScDnGXJAA1sAI7it3rNU6FHMZCjsOOkNrVbzj3LyBAGNDuJoiZBqP1wVPdIvuSVzeb1AHlGBGVMgR8fDGuIAeZBVnjlWZAajTLhdhYd6N1xK5ZA5t22hI2j64Mjg1yTnp8DVcV1LIvZCf5onA91SnATg6aFgZDZD',
            method: 'POST', 
            json: {
                recipient: { id: recipientId },
                message: message,
            }
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

app.listen((process.env.PORT || 8080));
