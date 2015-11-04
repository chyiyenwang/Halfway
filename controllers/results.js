var express = require('express');
var geocoder = require('geocoder');
var router = express.Router();
var db = require('../models');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.route('/results')
  .get(function(req, res) {
    if (req.query.address.length > 0) {
      locationInput = req.query.address;
      geocoder.geocode(locationInput, function (err, data) {
        var destination = data.results[0].geometry.location
          res.render('results', {destination: destination});
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
          name: req.body.title
        },
        defaults: {
          name: req.body.title,
          address: req.body.address,
          userId: req.session.user
        }
      }).spread(function(user, created) {
        console.log('asdfasd');
      })
    };
  });

// router.route('/results')
//   .get(function(req, res) {
//     res.render('results');
//   });

module.exports = router;