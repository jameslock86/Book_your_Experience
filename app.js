var mongoose = require('mongoose');
var mongodb = require('mongodb');

var express = require('express');

var bluebird = require('bluebird');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passportSetup = require('./public/javascripts/passport-setup');
var keys = require('./public/javascripts/keys');
var cookieSession = require('cookie-session');
var passport = require('passport');
var axios = require('axios');
var Models = require('./models');
var users = require('./public/javascripts/models/user-model');
mongoose.Promise = bluebird;
var db = mongoose.connection;


var index = require('./routes/index');
var usersRoutes = require('./routes/users');
var auth = require('./routes/auth');
var profile = require('./routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname +'/views'));
app.set('view engine', 'hbs');
app.set('mongo', db);
//encrypt cookie
app.use(cookieSession({
	//one day
	maxAge:24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
//mongoose.connect(keys.mongodb.dbURI, () =>{
//	console.log('connected to mongo!!!');
//});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', usersRoutes);
app.use('/auth', auth);
app.use('/profile', profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
