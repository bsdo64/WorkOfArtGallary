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
var users;
pool.query('SELECT * from user', function(err, rows) {
    users = rows.length;
});

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('signin', { });
    console.log(users);
});

router.post('/', function(req, res) {
    var name = req.body.id;
    var password = req.body.pw;

    pool.query('SELECT * from user where name="'+req.body.id+'"', function(err, rows) {
        if (err) throw err;

        if(rows.length > 0) {
            res.render('signin_not', {
                cookie : req.headers.cookie ? 1 : 0
            });
        } else {

            pool.query('INSERT into user values ('+(Number(users)+1)+',"'+ name +'","'+password+'")', function(err, rows) {
                if(err) throw err;
                users++;
            });

            res.render('signin_success', JSON.stringify(
                {
                    name : name,
                    cookie : req.headers.cookie ? 1 : 0
                }
            )
            );
        }


    });

    //res.render('signin_success', { });
});

module.exports = router;
