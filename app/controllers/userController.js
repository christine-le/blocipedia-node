const express = require('express');
const router = express.Router();
const User = require('../models').User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const stripe = require("stripe")("sk_test_wPNyoJk9MwDSGISSelw3bpD5");

module.exports = {
	update(req, res, next){
		User.findById(req.params.id)
	    .then(user => {
			res.send('NOT IMPLEMENTED: User Update');
		})
	    .catch(err => {
	    	res.send('NOT IMPLEMENTED: User Update');
	    });
   	},
   	upgrade(req, res, next){
		User.findById(req.params.id)
	    .then(user => {
			var stripeToken = req.body.stripeToken;
			// Charge the user's card:
			stripe.charges.create({
				amount: 1500,
			  	currency: "usd",
			  	description: "Example charge",
			  	source: stripeToken,
			}, function(err, charge) {
			  // asynchronously called
			});
			res.send('NOT IMPLEMENTED: User Update');
		})
	    .catch(err => {
	    	res.send('NOT IMPLEMENTED: User Update');
	    });
   	},
   	logout(req, res, next){
		req.logout();
		res.render('index.ejs', {title: 'Blocipedia'});
   	},
   	signup(req, res, next){
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		const password_conf = req.body.password_conf;
		
		if (password != password_conf) {
			res.render('signup.ejs', { title: 'Signup', error: "Password confirmation does not match.  Please try again." });
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
					res.render('login.ejs', { title: 'Login', msg: 'You are now signed up and can log in!' });
				})
				.catch(err => {
					res.render('signup.ejs', { title: 'Signup', error: "There were problems with the sign up.  Please try again." });
				});
		}
   	},
   	login(req, res, next){
   		passport.authenticate('local', {session: false}, (err, user, info) => {
	        if (err || !user) {
	            return res.status(400).json({
	                message: info ? info.message : 'Login failed',
	                user   : user
	            });
	        }

	        req.login(user, {session: false}, (err) => {
	            if (err) {
	                res.send(err);
	            }

	            const token = jwt.sign(user.toJSON(), 'your_jwt_secret');

	            // return res.json({user, token});
	        	res.render('index.ejs', {user, title: 'Blocipedia', token});
	        });
	    })
	    (req, res);
   	}
}

// router.post('/login', function (req, res) {
//     User.findOne({
//     	email: req.body.email
//     })
//     .then(user => {
// 	    user.comparePassword(req.body.password, (err, isMatch) => {
// 	    	if (isMatch) {
// 	    		// generate a signed son web token with the user object as the payload and return it in the response
// 	    		const token = jwt.sign(user.toJSON(), 'your_jwt_secret'); 
// 	    		// return res.json({user, token});
// 	    		res.render('login.ejs', { title: 'Login', msg: 'You are now logged in!' });
// 	    	} else {
// 	        	res.render('login.ejs', { title: 'Login', error: "Unable to log in.  Please try again." });
// 	        }
//     	});
// 	})
//     .catch(err => {
//     	res.render('login.ejs', { title: 'Login', error: err });
//     });
// });
