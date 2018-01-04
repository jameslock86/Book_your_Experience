const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const facebookStrategy = require('passport-facebook')
const keys = require('./keys')
const User = require('./models/user-model');

//take identifying piece of info from user and put it in a cookie(mongodb id)
passport.serializeUser((user, done)=>{
  done(null, user.id);
});

//when cookie gets sent back we find the user based on the id
passport.deserializeUser((id, done)=>{
  User.findById(id).then((user) => {
      done(null, user);
  })
});

passport.use(new facebookStrategy({

       // pull in our app id and secret from our auth.js file
       clientID        : keys.facebook.clientID,
       clientSecret    : keys.facebook.clientSecret,
       callbackURL     : '/auth/facebook/redirect',
       profileFields   : ['id', 'first_name', 'last_name', 'email', 'picture']
     },

   // facebook will send back the token and profile
   function(token, refreshToken, profile, done) {

       // asynchronous
       process.nextTick(function() {

           // find the user in the database based on their facebook id
           User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

               // if there is an error, stop everything and return that
               // ie an error connecting to the database
               if (err)
                   return done(err);

               // if the user is found, then log them in
               if (user) {
                   return done(null, user); // user found, return that user
               } else {
                   // if there is no user found with that facebook id, create them

                   var newUser = new User({
                     username: `${profile.name.givenName}`,
                     facebookid: profile.id,
                     thumbnail: profile.photos[0].value
                   })
                    console.log(newUser)
                   newUser.save(function(err) {
                       if (err) {
                         console.error('Facebook login error:', err);
                       }

                       // if successful, return the new user
                       return done(null, newUser);
                   });
               }
            });
       });

}));




passport.use(new googleStrategy({
  //options for the google strat
  callbackURL:"/auth/google/redirect",
  clientID:keys.google.clientID,
  clientSecret:keys.google.clientSecret
}, (accesToken, refreshToken, profile, done) => {
  //check if user already exists
  User.findOne({googleid:profile.id}).then((currentUser)=>{
    if(currentUser){
      //already have the user
      console.log('user is', currentUser)
      done(null, currentUser)
    } else {
      //create user in db
      new User({
        username: profile.displayName,
        googleid: profile.id,
        thumbnail: profile._json.image.url
      }).save().then((newUser) => {
        console.log('new user', newUser)
        done(null, newUser)
      });
    }
  });
})
);
