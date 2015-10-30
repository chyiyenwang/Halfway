var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.use(ejsLayouts);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000, function() {
  console.log('Skynet initializing');
});