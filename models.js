var mongoose = require('mongoose');
const keys = require ('./public/javascripts/keys');
var users = require('./public/javascripts/models/user-model');
mongoose.connect(keys.mongodb.dbURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function(callback){
	 console.log('Connection Succeeded.');
	 });

var user = mongoose.model('users', users);

module.exports.user = user;
