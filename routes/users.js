var mongoose = require('mongoose');
var nameSchema = require('../public/javascripts/models/user-model');
mongoose.model('user', nameSchema);
var keys = require('../public/javascripts/keys');
//mongoose.connect('keys');
//console.log('your keys stuff is ',keys);
var MongoClient = require('mongodb').MongoClient;
var conn = mongoose.createConnection(keys.mongodb.dbURI);
var user = conn.model('user');
var express = require('express');
var router = express.Router();
//console.log(MongoClient);
//sets up the routes for the post to the back end
router.post('/', function(req, res) {

	var myData = {
		full_name: req.body.full_name,
		telephone: req.body.telephone,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		thumbnail: req.body.thumbnail

	};
	//console.log(req.body.username);
	//creating the table and posting it to the table
	user.create(myData, function(err, myData) {
		if (err) {
			//checking the error
			console.log(err);
			res.sendStatus(500);
		}
	});
	console.log(myData);
	//sends the info to the views page down bellow
	res.render('./profile', {user: myData});

});

var authCheck = (req, res, next) => {
	if (!req.user) {
		//if user is not logged in

		res.redirect('./auth/login');
	} else {
		//if logged in
		next();
		res.redirect('/');

	}
};



/* GET users listing. */
router.get('/', authCheck, function(req, res) {
	res.render('/profile', req.user);

});
//
// router.get('/profile/profile-edit',function (req,res,next) {
// 	let id = req.params.id;
// 	let updatebody = req.body;
// 	console.log('working on adding pics');
//
// 	router.patch('');
// 	user.updateOne('user').updateOne();
// });
// MongoClient.connect(conn, function (err, user) {
// 	if(err) throw err;
// 	var myQuery = ({user:'_id'},{user:'thumbnail'});
// 	var newValue = ({user:'_id'},{user:'thumbnail'});
//
// 	console.log('work dangit',myQuery);
// 	user.collection(myData).updateOne(myQuery,newValue, function (err,res) {
// 		if(err) throw err;
// 		db.close();
// 	});
//
// });



module.exports = router;
