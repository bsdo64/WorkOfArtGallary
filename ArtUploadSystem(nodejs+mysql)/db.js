/**
 * Created by bsdo64 on 2014-06-09.
 */
var mysql = require('mysql');
var db = null;
var pool = function () {
    if(!db) {
        db = mysql.createClient({
            host    :'localhost',
            port : 3306,
            user : 'root',
            password : 'dkbs12',
            database:'internet'
        });
    }
    return db;
};
module.exports = pool;