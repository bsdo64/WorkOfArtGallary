
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');


var routes = require('./routes/index');
var users = require('./routes/users');
var piece = require('./routes/piece');
var submit = require('./routes/submit');
var login = require('./routes/login');
var signin = require('./routes/signin');
var logout = require('./routes/logout');
var uniart = require('./routes/uniart');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({
    dest : './public/uploads/design/',
    rename : function(fieldname, filename) {
        return filename + Date.now();
    }
    })
);

app.use('/', routes);
app.use('/users', users);
app.use('/piece', piece);
app.use('/submit', submit);
app.use('/login', login);
app.use('/signin', signin);
app.use('/logout', logout);
app.use('/uniart', uniart);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
