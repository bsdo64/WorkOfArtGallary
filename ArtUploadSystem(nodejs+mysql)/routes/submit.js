/**
 * Created by bsdo64 on 2014-06-09.
 */
var express = require('express');
var multer = require('multer');

var mysql = require('mysql');
var fs = require('fs');

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

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('submit', {
        cookie : req.headers.cookie ? 1 : 0
    });
});

router.post('/', function(req,res) {

    var price = req.body.price;
    var writer = req.body.writer;
    var piece_name = req.body.piece_name;
    var size = req.body.size;
    var date= req.body.date;
    var comment = req.body.comment;
    var img_name  = req.files.upload.name;
    var address = req.body.address;

    console.log(req.files.upload.name);

    fs.createReadStream('./'+req.files.upload.path).pipe(fs.createWriteStream('./'+ req.files.upload.path.split('.')[0] + '-2.jpg'));

    pool.query('INSERT into piece values ('+(Number(length)+1)+',"'+ writer +'","'+piece_name+'","'+size+'","'+price+'","'+date+'","'+comment+'","'+img_name.split('.')[0]+'", "'+address+'")', function(err, rows) {
        if(err) throw err;


    });
    pool.query('INSERT into list values ('+(Number(length)+1)+',"'+ writer +'","'+img_name.split('.')[0]+'-2", 0)', function(err, rows) {
        if(err) throw err;
        length++;
    });

    res.render('submit_success', {
        cookie : req.headers.cookie ? 1 : 0
    });
//    fs.readFile(req.files.upload.path, function (err, data) {
//        // ...
//        var newPath = __dirname + "/uploads/uploadedFileName";
//        fs.writeFile(newPath, data, function (err) {
//            res.redirect("back");
//        });
//    });

//    var tempPath = req.files.file.path,
//        targetPath = path.resolve('./    /image.png');
//
//    if (path.extname(req.files.file.name).toLowerCase() === '.png' || '.jpg') {
//        fs.rename(tempPath, targetPath, function(err) {
//            if (err) throw err;
//            console.log("Upload completed!");
//        });
//    } else {
//        fs.unlink(tempPath, function () {
//            console.error("Only .png files are allowed!");
//        });
//    }

});

//router.post('/', function(req, res) {
//    res.render('submit_success', {
//        cookie : req.headers.cookie ? 1 : 0
//    });
//});

module.exports = router;