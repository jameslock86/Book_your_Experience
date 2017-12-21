'use strict';
// how we read the file
let fs = require('fs');
let express = require('express');
let app = express();
//sets port
let port = process.env.PORT||8000;
//sets middle ware
let morgan= require('morgan');
let bodyParser= require('body-parser');
app.disabled('x-powered-by');
app.use(morgan('short'));
//password infomation
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


//sets views
app.set('views','/views');
app.set('view engine','ejs');
//middleWear
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
let methodOverride = require('method-override');
//how we call the back end up into uesfulness
app.use('/', function (req, res) {
	res.render('index');
});
// sets the nodemon to where we are listening to it from the PORT
app.listen(port,function () {
	console.log('Listening on port', port);
});
