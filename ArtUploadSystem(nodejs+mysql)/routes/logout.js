/**
 * Created by bsdo64 on 2014-06-11.
 */
var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
    console.log(req.cookies.id);

    res.cookie('id', req.cookies.id, {
        maxAge: 0
    });

    res.render('logout', {
        cookie : req.headers.cookie ? 1 : 0
    });
});

module.exports = router;