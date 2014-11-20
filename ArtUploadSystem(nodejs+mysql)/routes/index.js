var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var pool  = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : 'dkbs12',
    database        : 'internet'
});



/* GET home page. */
router.get('/', function(req, res) {

    pool.query('SELECT * from list', function(err, rows) {
        if (err) throw err;

        if(req.headers.cookie){
            res.render('index', {
                data : JSON.stringify(rows),
                cookie : 1
            });

        }else {
            res.render('index', {
                data : JSON.stringify(rows)
            });
        }





    });
});


module.exports = router;
