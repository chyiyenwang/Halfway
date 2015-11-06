var express = require('express');
var router = express.Router();
var db = require('../models');

router.route('/locations')
  .get(function(req, res) {
    if (req.session.user) {
      db.location.findAll({
        attributes:[['id', 'id'],
                    ['name', 'name'],
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

router.route('/locations/:id')
  .delete(function(req, res) {
    var id = req.params.id;

    db.location.find({
      where: {
        id: id
      }
    }).then(function(location) {
      console.log(location);
      location.destroy({force: true}).then(function() {
        res.send('you a bitch');
      });
    });
  });

module.exports = router;