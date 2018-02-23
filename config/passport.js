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
//       return done(null, user, {message: 'Logged In Successfully' });
//     });
//   }
// ));

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, callback) {
      return User.findOne({email, password})
      .then(user => {
        if (!user) {
          return callback(null, false, {error: 'Incorrect email.'});
        }

        return user.comparePassword(password, (err, isMatch) => {
          if (err) { return callback(null, false, { error: err }); }

          if (!isMatch) {
            return callback(null, false, { error: 'Incorrect password'});
          }

          return callback(null, user, {message: 'Logged In Successfully'} );
        });
      })
      .catch(err => {
        return callback(err);
      });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return UserModel.findOneById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
    }
));



// passport.use(new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password'
// }, (email, password, callback) => {

//   return User.findOne({ email: email }, (err, user) => {
//     if (err) { return callback(err); }


//     if (!user) {
//       const error = new Error('Incorrect email or password');
//       error.name = 'IncorrectCredentialsError';

//       return callback(error);
//     }

//     // check if a hashed user's password is equal to a value saved in the database
//     return user.comparePassword(password, (passwordErr, isMatch) => {
//       if (err) { return callback(err); }

//       if (!isMatch) {
//         const error = new Error('Incorrect email or password');
//         error.name = 'IncorrectCredentialsError';

//         return callback(error);
//       }

//       const payload = {
//         sub: user._id
//       };

//       // create a token string
//       // const token = jwt.sign(payload, config.jwtSecret);
//       const token = jwt.sign(payload, 'some secret key');
//       const data = {
//         name: user.name
//       };

//       return callback(null, token, data);
//     });
//   });
// }));


module.exports = passport;
