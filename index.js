var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var db = require('./models');
var path = require('path');
var geocoder = require('geocoder');

app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/static')));
app.set('view engine', 'ejs');

var session = require('express-session');
app.use(session({
  secret: process.env.SALT,
  resave: false,
  saveUninitialized: true
}));

var gkey = {
  google_key: process.env.GOOGLE_MAPs_KEY
};

app.use(function(req, res, next) {
  if (req.session.user) {
    db.user.findById(req.session.user).then(function(user) {
      if (user) {
        req.currentUser = user;
        next();
      }
      else {
        req.currentUser = false;
        next();
      }
    });
  }
  else {
    req.currentUser = false;
    next();
  }
});

var flash = require('connect-flash');
app.use(flash());

app.use(function(req, res, next) {
  res.locals.currentUser = req.currentUser;
  res.locals.alerts = req.flash();
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});
app.use('/', require('./controllers/auth'));
app.use('/', require('./controllers/results'));

app.listen(port, function() {
  console.log('Skynet initializing');
});