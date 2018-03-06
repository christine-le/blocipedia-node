const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT   = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT    = passportJWT.ExtractJwt;
const User = require('../app/models').User;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, callback) {
      return User.findOne({ where: {email: email}})
      .then(user => {
        if (!user) {
          return callback(null, false, {error: 'Incorrect email'});
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


module.exports = passport;
