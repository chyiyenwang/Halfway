var express = require('express');
var router = express.Router();

router.route('/results')
  .get(function(req, res) {
    res.render('results');
});

module.exports = router;