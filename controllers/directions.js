var express = require('express');
var geocoder = require('geocoder');
var router = express.Router();
var db = require('../models');
var distance = require('google-distance-matrix');
var geolib = require('geolib');

router.route('/directions')
  .get(function(req, res) {
    res.render('directions');
  });

module.exports = router;