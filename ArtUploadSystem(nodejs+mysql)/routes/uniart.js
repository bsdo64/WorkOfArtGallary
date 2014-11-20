/**
 * Created by bsdo64 on 2014-06-11.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('uniart', {
        cookie : req.headers.cookie ? 1 : 0
    });
});

module.exports = router;
