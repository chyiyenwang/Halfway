var express = require('express');
var geocoder = require('geocoder');
var router = express.Router();
var db = require('../models');
var distance = require('google-distance-matrix');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.route('/results')
  .get(function(req, res) {
    if (req.query.address.length > 0) {
      // var locationInput = req.query.address;
      var origins = [req.query.address];
      var destinations = [req.query.address2];
      geocoder.geocode(origins, function (err, data) {
        var rendezvous = data.results[0].geometry.location
          res.render('results', {rendezvous: rendezvous});
      });
    }
    else {
      req.flash('info', 'Enter an address');
      res.redirect('/');
    }
  })
  .post(function(req, res) {
    // res.send(req.body.title);
    // db.user.findbyId()
    if (req.session.user == null) {
      req.flash('danger', 'You need to be signed in!');
      res.redirect('/');
    }
    else {
      db.location.findOrCreate({
        where: {
          address: req.body.address,
          userId: req.session.user
        },
        defaults: {
          name: req.body.title,
          address: req.body.address,
          userId: req.session.user
        }
      }).spread(function(user, created) {
        res.redirect('/');
      })
    };
  });

// router.route('/results')
//   .get(function(req, res) {
//     res.render('results');
//   });

module.exports = router;