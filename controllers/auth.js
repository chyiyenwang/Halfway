var express = require('express');
var router = express.Router();
var db = require('../models');

router.route('/signup')
  .get(function(req, res) {
    res.render('signup');
  })
  .post(function(req, res) {
    if (req.body.password !== req.body.password2) {
      req.flash('danger', 'Passwords must match!');
      res.redirect('/signup');
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
          res.redirect('/signup');
        }
      }).catch(function(err) {
        req.flash('danger', 'an error occurred');
        res.redirect('/signup');
      });
    }
  });

module.exports = router;