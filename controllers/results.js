var express = require('express');
var geocoder = require('geocoder');
var router = express.Router();

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
  });

// router.route('/results')
//   .get(function(req, res) {
//     res.render('results');
//   });

module.exports = router;