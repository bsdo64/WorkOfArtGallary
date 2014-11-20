var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var pool  = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : 'dkbs12',
    database        : 'internet'
});

var length;
pool.query('SELECT * from piece' , function(err, rows) {
    length = rows.length;
    console.log(length);
});

/* GET home page. */
router.get('/:id', function(req, res) {
    pool.query('SELECT * from piece where id='+Number(req.params.id)+' or id='+(Number(req.params.id)-1)+' or id='+(Number(req.params.id)+1) , function(err, rows) {
        if (err) throw err;

        if(req.params.id == 1) {

            res.render('piece', {
                cookie : req.headers.cookie ? 1 : 0,
                data : JSON.stringify(rows[0]),
                data2 : JSON.stringify({
                    id: 1
                }),
                data3 : JSON.stringify(rows[1])
            });

        } else if(req.params.id >= length){
            res.render('piece', {
                cookie : req.headers.cookie ? 1 : 0,
                data : JSON.stringify(rows[1]),
                data2 : JSON.stringify(rows[0]),
                data3 : JSON.stringify({
                    id: req.params.id
                })
            });
        } else {

            console.log(rows[0]);
            console.log(rows[1]);
            console.log(rows[2]);

            res.render('piece', {
                cookie : req.headers.cookie ? 1 : 0,
                data : JSON.stringify(rows[1]),
                data2 : JSON.stringify(rows[0]),
                data3 : JSON.stringify(rows[2])
            });
        }
    });


});

module.exports = router;