var express = require('express');
var geocoder = require('geocoder');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

var yelp = require('yelp').createClient({
  consumer_key:       process.env.YELP_CONSUMER_KEY, 
  consumer_secret:    process.env.YELP_CONSUMER_SECRET,
  token:              process.env.YELP_TOKEN,
  token_secret:       process.env.YELP_TOKEN_SECRET
});


router.route('/results')
  .get(function(req, res) {
    if (req.query.address.length > 0) {
      locationInput = req.query.address;
      geocoder.geocode(locationInput, function (err, data) {
        var yourLocation = data.results[0].geometry.location
        yelp.search({term: "tacos", ll: yourLocation.lat + ", " + yourLocation.lng }, function(error, obj) {
          // res.send({obj: obj});
          res.render('results', {yourLocation: yourLocation, obj: obj});
        })
        // res.render('results', {yourLocation: yourLocation, obj: obj});
        // res.send(yourLocation.lat);
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