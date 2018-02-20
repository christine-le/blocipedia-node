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

	}
	else {
		let newUser = User.build({
			name: name,
			email: email,
			password: password
		});

		// Refactor and make separate hash function later for bcrypt
		bcrypt.genSalt(10, function(err, salt){
			bcrypt.hash(newUser.password, salt, function(err, hash){
				if (err){
					console.log(err);
				}
				newUser.password = hash;

				newUser
					.save()
					.then(user => {
						// res.flash('success', 'You are now signed up and can log in');
						res.redirect('/login');
					})
					.catch(err => {
						console.log('here******', err);
						res.render('signup.jade', { title: 'Signup', errors: err });
					});
			});
		});
	}
});

// router.post('/user/login', function(req, res){
// 	const email = req.body.email;
// 	const password = req.body.password;


// 	if (!password) {

// 	}
// 	else {
// 		let newUser = User.build({
// 			email: email,
// 			password: password
// 		});

		// bcrypt.genSalt(10, function(err, salt){
		// 	bcrypt.hash(newUser.password, salt, function(err, hash){
		// 		if (err){
		// 			console.log(err);
		// 		}
		// 		newUser.password = hash;

		// 		newUser
		// 			.save()
		// 			.then(user => {
		// 				res.redirect('/login');
		// 			})
		// 			.catch(err => {
		// 				res.render('login.jade', { title: 'Login', errors: err });
		// 			});
		// 	});
		// });
// 	}
// });

router.post('/user/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'your_jwt_secret'); 
           return res.json({user, token});
        });
    })(req, res);
});


module.exports = router;