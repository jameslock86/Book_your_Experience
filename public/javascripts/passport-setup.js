const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('./models/user-model');

//take identifying piece of info from user and put it in a cookie(mongodb id)
passport.serializeUser((user, done)=>{
	done(null, user.id);
});

//when cookie gets sent back we find the user based on the id
passport.deserializeUser((id, done)=>{
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(new googleStrategy({
	//options for the google strat
	callbackURL:'/auth/google/redirect',
	clientID:keys.google.clientID,
	clientSecret:keys.google.clientSecret
}, (accesToken, refreshToken, profile, done) => {
	//check if user already exists
	User.findOne({googleid:profile.id}).then((currentUser)=>{
		if(currentUser){
			//already have the user
			  console.log('user is', currentUser);
			done(null, currentUser);
		} else {
			//create user in db
			new User({
				username: profile.displayName,
				googleid: profile.id,
				thumbnail: profile._json.image.url
			}).save().then((newUser) => {
				    console.log('new user', newUser);
				done(null, newUser);
			});
		}
	});
})
);
