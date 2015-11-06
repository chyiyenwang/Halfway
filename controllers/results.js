var express = require('express');
var geocoder = require('geocoder');
var router = express.Router();
var db = require('../models');
var distance = require('google-distance-matrix');
var geolib = require('geolib');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.route('/results')
  .get(function(req, res) {
    if (req.query.address1 && req.query.address1.length > 0 && req.query.address2 && req.query.address2.length > 0) {
      var user1 = req.query.address1;
      var user2 = req.query.address2;
      var userButton = req.query.radioButton;

      geocoder.geocode(user1, function(err, data) {
        user1 = data.results[0].geometry.location;
        geocoder.geocode(user2, function(err, data) {
          user2 = data.results[0].geometry.location;

          // Finds the location between the 2 
          var rendezvous = geolib.getCenter([
            {latitude: user1.lat, longitude: user1.lng},
            {latitude: user2.lat, longitude: user2.lng}
          ])

          rendezvous.latitude = parseFloat(rendezvous.latitude);
          rendezvous.longitude = parseFloat(rendezvous.longitude);
          res.render('results', {rendezvous: rendezvous, user1: user1, userButton: userButton});
        })
      });
    }
    else {
      req.flash('info', 'Enter an address');
      res.redirect('/');
    }
  })
  .post(function(req, res) {
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
        res.redirect('/results');
      })
    };
  });

module.exports = router;