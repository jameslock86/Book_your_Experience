const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const routes = require('../routes/users');
const userSchema = new Schema({
	username: String,
	googleid: String,
	thumbnail: String,
	full_name: String,
	telephone: String,
	email: String,
	password: String,
	confirmPassword: String

});


// const mongo = require(% mongo ds012345.mlab.com:56789/book_your_experience -u anderslund -p greatness2)


module.exports = userSchema;
