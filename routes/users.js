const express = require('express');
const router = express.Router();
const User = require('../app/models').User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// module.exports = (app) => {
//   app.use('/', router);
// };

router.get('/', (req, res, next) => {
	res.render('index.jade');
});

router.get('/login', function(req, res){
  res.render('login.jade', { title: 'Login' });
});

router.get('/signup', function(req, res){
  res.render('signup.jade', { title: 'Signup' });
});

router.post('/user/signup', function(req, res){
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const password_conf = req.body.password_conf;

	if (password != password_conf) {
		res.render('signup.jade', { title: 'Signup', errors: "Password confirmation does not match.  Please try again." });
	}
	else {
		let newUser = User.build({
			name: name,
			email: email,
			password: password
		});

		newUser
			.save()
			.then(user => {
				res.render('login.jade', { title: 'Login', msg: 'You are now signed up and can log in!' });
			})
			.catch(err => {
				res.render('signup.jade', { title: 'Signup', errors: "There were problems with the sign up.  Please try again." });
			});
	}
});

router.post('/user/login', passport.authenticate('local'), function (req, res) {
    User.findOne({
    	email: req.body.email
    })
    .then(user => {
	    // Check to see if their password is the same as the hashed one
	    user.comparePassword(req.body.password, (err, isMatch) => {
	    	if (isMatch) {
	    		res.render('login.jade', { title: 'Login', msg: 'You are now logged in!' });
	    	} else {
	        	res.render('login.jade', { title: 'Login', error: "Unable to log in.  Please try again." });
	        }
    	});
	})
    .catch(err => {
    	res.render('login.jade', { title: 'Login', error: err });
    });
});

// router.post('/login', (req, res, next) => {
//   // first - find a user by their username (which should always be unique)
//   return User.findOne({ username: req.body.username })
//     .then(user => {
//       // then check to see if their password is the same as the hashed one
//       user.comparePassword(req.body.password, (err, isMatch) => {
//         if (isMatch) {
//           // if so - they are logged in!
//           return res.send('logged in!');
//         } else {
//           return res.redirect('/users/login');
//         }
//       });
//     })
//     .catch(err => {
//       return res.send(err);
//     });
// });

// router.post('/user/login', function (req, res, next) {
//     passport.authenticate('local', {session: false}, (err, user, info) => {
//         if (err || !user) {
//             return res.status(400).json({
//                 message: 'Unable to log in',
//                 user   : user
//             });
//         }
//        req.login(user, {session: false}, (err) => {
//            if (err) {
//                res.send(err);
//            }
//            // generate a signed son web token with the contents of user object and return it in the response
//            const token = jwt.sign(user, 'your_jwt_secret'); 
//            return res.json({user, token});
//         });
//     })(req, res);
// });


module.exports = router;