const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const routes = require('../routes/users');
const userSchema = new Schema({
<<<<<<< HEAD
  username: String,
  googleid: String,
  facebookid: String,
  thumbnail: String
=======
	username: String,
	googleid: String,
	thumbnail: String,
	full_name: String,
	telephone: String,
	email: String,
	password: String,
	confirmPassword: String

>>>>>>> f59e95e9eb8d433fe253ebb5d70343986da38889
});


// const mongo = require(% mongo ds012345.mlab.com:56789/book_your_experience -u anderslund -p greatness2)


module.exports = userSchema;
