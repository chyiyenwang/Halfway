var express = require('express');
var geocoder = require('geocoder');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.route('/results')
  .get(function(req, res) {
    locationInput = req.query.address;
    // res.send('hello');
    geocoder.geocode(locationInput, function ( err, data ) {
      var yourLocation = data.results[0].geometry.location
      // res.send(yourLocation)
      res.render('results', {yourLocation: yourLocation});
    });
  });

// router.route('/results')
//   .get(function(req, res) {
//     res.render('results');
//   });

module.exports = router;