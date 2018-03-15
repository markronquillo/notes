const express = require('express')
const hbs = require('hbs');

var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {

});

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

app.get('/', (req, res) => {
	// res.send('Hello Express!');
	res.send({
		name: 'Mark',
		age: 28
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page',
	});
})

app.listen(3000);
