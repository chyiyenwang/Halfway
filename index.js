var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express();

app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(__dirname + '/static/'));
app.set('view engine', 'ejs');

var session = require('express-session');
app.use(session({
  secret: 'ifyousmellwhattherockiscookin',
  resave: false,
  saveUninitialized: true
}));

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


app.get('/', function(req, res) {
  res.render('index');
});

var flash = require('connect-flash');
app.use(flash());

app.use(function(req, res, next) {
  res.locals.currentUser = req.currentUser;
  res.locals.alerts = req.flash();
  next();
});

app.use('/', require('./controllers/auth'));
app.use('/', require('./controllers/results'));

app.listen(3000, function() {
  console.log('Skynet initializing');
});