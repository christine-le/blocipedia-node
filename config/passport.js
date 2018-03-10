const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models').User;

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function (email, password, callback) {
      return User.findOne({ where: {email: email}})
      .then(user => {
        if (!user) {
          return callback(null, false, {message: 'Incorrect email'});
        }
        return user.comparePassword(password, (err, isMatch) => {
          if (err) { return callback(null, false, { error: err }); }

          if (!isMatch) {
            return callback(null, false, {message: 'Incorrect password'});
          }

          return callback(null, user, {message: 'Logged In Successfully'} );
        });
      })
      .catch(err => {
        return callback(err);
      });
    }
));

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
  .then((user) => {
    callback(null, user);
  })
  .catch((err =>{
    callback(err, user);
  }))
});

module.exports = passport;
