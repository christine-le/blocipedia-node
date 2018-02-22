const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT   = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT    = passportJWT.ExtractJwt;
const User = require('../app/models').User;

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));


// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//     }, 
//     function (email, password, cb) {
//         return User.findOne({email})
//            .then(user => {
//                if (!user) {
//                    return cb(null, false, {message: 'Incorrect email'});
//                }
//                return cb(null, user, {message: 'Logged In Successfully'});
//           })
//           .catch(err => cb(err));
//     }
// ));

// passport.use(new LocalStrategy(localOptions, function(email, password, done){
//     User.findOne({
//         email: email
//     }, function(err, user){
//         if(err){
//           console.log("error in passport", err);
//           return done(err);
//         }
//         if(!user){
//           console.log("login failed in passport", err);
//           return done(null, false, {error: 'Login failed. Please try again.'});
//         }
//         user.validatePassword(password, function(err, isMatch){
//             if(err){
//               return done(err);
//             }
//             if(!isMatch){
//               console.log("no match", err);
//               return done(null, false, {error: 'Login failed. Please try again.'});
//             }
//             return done(null, user);
//         });
//     });
// }));
 
// passport.use(new JWTStrategy({
//         jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//         secretOrKey   : 'your_jwt_secret'
//     },
//     function (jwtPayload, cb) {
//         //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//         return User.findOneById(jwtPayload.id)
//             .then(user => {
//                 return cb(null, user);
//             })
//             .catch(err => {
//                 return cb(err);
//             });
//     }
// ));

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  console.log('here passport*******');

  // find a user by email address
  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: user._id
      };

      // create a token string
      // const token = jwt.sign(payload, config.jwtSecret);
      const token = jwt.sign(payload, 'some secret key');
      const data = {
        name: user.name
      };

      return done(null, token, data);
    });
  });
}));

module.exports = passport;
