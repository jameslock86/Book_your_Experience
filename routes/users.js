// var express = require('express');
// var router = express.Router();
// var mongoose = require('mongoose');
//
// let knexFile = require('../knexfile')['development'];
// /* GET users listing. */
// var bcrypt = require('bcrypt-nodejs');
//
//
// router.post('/', function(req, res) {
// 	knex('users')
// 		.then(function (users) {
// 			res.render('user',{ user
// 			});
// 		})
// 		.catch(function(error) {
// 			res.sendStatus(500);
// 		});
// });
//
// bcrypt.genSalt(5, function(err, salt) {
// 	if (err) return err;
//
// 	bcrypt.hash('yellow', salt, null, function(err, hash) {
// 		attrs.password = hash;
// 	});
// });
//
//
// // Load password hash from DB
// bcrypt.compare('my_password', hash, function(err, res) {
// 	// res === true
// });
// bcrypt.compare('not my password', hash, function(err, res) {
// 	// res === false
// });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// module.exports = router;



//
// var mongoose = require('mongoose'),
// 	Schema = mongoose.Schema,
// 	bcrypt = require('bcrypt'),
// 	SALT_WORK_FACTOR = 10;
//
// var UserSchema = new Schema({
// 	username: { type: String, required: true, index: { unique: true } },
// 	password: { type: String, required: true }
// });
//
// UserSchema.pre('save', function(next) {
// 	var user = this;
//
// 	// only hash the password if it has been modified (or is new)
// 	if (!user.isModified('password')) return next();
//
// 	// generate a salt
// 	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
// 		if (err) return next(err);
//
// 		// hash the password using our new salt
// 		bcrypt.hash(user.password, salt, function(err, hash) {
// 			if (err) return next(err);
//
// 			// override the cleartext password with the hashed one
// 			user.password = hash;
// 			next();
// 		});
// 	});
// });
//
// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
// 	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
// 		if (err) return cb(err);
// 		cb(null, isMatch);
// 	});
// };
//
// module.exports = mongoose.model('User', UserSchema);
