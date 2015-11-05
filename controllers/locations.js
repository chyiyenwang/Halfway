var express = require('express');
var router = express.Router();
var db = require('../models');

router.route('/locations')
  .get(function(req, res) {
    db.location.findAll({
      attributes:
        [['name', 'name'], ['address', 'address']],
      where: {
        userId: req.session.user
      }
    }).then(function(places, created) {
      // res.send(places);
      res.render('locations', {places: places});
    })
  });

module.exports = router;