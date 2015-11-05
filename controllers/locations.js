var express = require('express');
var router = express.Router();
var db = require('../models');

router.route('/locations')
  .get(function(req, res) {
    if (req.session.user) {
      db.location.findAll({
        attributes:[['name', 'name'],
                    ['address', 'address']],
        where: {userId: req.session.user},
        order: [['id', 'DESC']]
      }).then(function(places, created) {
        // res.send('hello');
        res.render('locations', {places: places});
      })
    }
    else {
      res.render('locations');
    }
  });

module.exports = router;