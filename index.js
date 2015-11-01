var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();


app.use(ejsLayouts);
app.use('/', express.static(__dirname + '/static/'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.use('/', require('./controllers/results'));

app.listen(3000, function() {
  console.log('Skynet initializing');
});