var express = require('express');
var router = express.Router();
var db = require('../models');

router.route('/auth/signup')
  .get(function(req, res) {
    res.render('auth/signup');
  })
  .post(function(req, res) {
    if (req.body.password !== req.body.password2) {
      req.flash('danger', 'Passwords must match!');
      res.redirect('/auth/signup');
    }
    else {
      db.user.findOrCreate({
        where: {
          email: req.body.email
        },
        defaults: {
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.first,
          lastName: req.body.last
        }
      }).spread(function(user, created) {
        if (created) {
          req.flash('success', 'You are signed up!');
          res.redirect('/');
        }
        else {
          req.flash('danger', 'A user with that email already exists!');
          res.redirect('/auth/signup');
        }
      }).catch(function(err) {
        req.flash('danger', 'an error occurred');
        res.redirect('/auth/signup');
      });
    }
  });

router.route('/auth/login')
  .get(function(req, res) {
    res.render('auth/login');
  })
  .post(function(req, res) {
    db.user.authenticate(req.body.email, req.body.password, function(err, user) {
      if (err) {
        res.send(err);
      }
      else if (user) {
        req.session.user = user.id;
        req.flash('success', 'You are logged in');
        res.redirect('/');
      }
      else {
        req.flash('danger', 'Invalid username or password');
        res.redirect('/');
      }
    });
  });

router.route('/auth/logout')
  .get(function(req, res) {
    req.flash('info', 'You are logged out!');
    req.session.user = false;
    res.redirect('/')
  });

module.exports = router;