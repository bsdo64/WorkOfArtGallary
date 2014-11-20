/**
 * Created by bsdo64 on 2014-06-11.
 */
var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var pool  = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : 'dkbs12',
    database        : 'internet'
});

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('login', {
        cookie : req.headers.cookie ? 1 : 0
    });

});

router.post('/', function(req, res) {


    pool.query('SELECT * from user where name="'+req.body.id+'"', function(err, rows) {
        if(rows.length >0){
            if(rows[0].password == req.body.pw) {

                res.cookie('id', req.body.id, {
                    maxAge: 5 * 60 * 1000
                });


                res.render('login_success', {
                    cookie : req.headers.cookie ? 1 : 0
                });

            }
        }
    });



});

module.exports = router;
