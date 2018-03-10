const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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


// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const User = require("../db/models").User;
// const authHelper = require("../auth/helpers");

// module.exports = {
//   init(app){
//     app.use(passport.initialize());
//     app.use(passport.session());

//     passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//       },
//       function (email, password, callback) {
//         return User.findOne({ where: {email: email}})
//         .then(user => {
//           if (!user) {
//             console.log("no user found>>>>>>");
//             return callback(null, false, {error: 'Incorrect email'});
//           }
//           return user.comparePassword(password, (err, isMatch) => {
//             if (err) { return callback(null, false, { error: err }); }

//             if (!isMatch) {
//               console.log("no match user found>>>>>>");
//               return callback(null, false, { error: 'Incorrect password'});
//             }
//             console.log("match  found>>>>>>");
//             return callback(null, user, {message: 'Logged In Successfully'} );
//           });
//         })
//         .catch(err => {
//           return callback(err);
//         });
//       }
//     ));

//     passport.serializeUser((user, callback) => {
//       callback(null, user.id);
//     });

//     passport.deserializeUser((id, callback) => {
//       User.findById(id)
//       .then((user) => {
//         callback(null, user);
//       })
//       .catch((err =>{
//         callback(err, user);
//       }))
//     });
//   }
// }