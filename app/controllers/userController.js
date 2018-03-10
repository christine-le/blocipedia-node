const express = require('express');
const router = express.Router();
const User = require('../models').User;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const stripe = require("stripe")(process.env.stripe_secret);

module.exports = {
	authenticate(req, res, next) {
	    if (!req.user){
	      req.flash("notice", "Please sign in")
	      return res.redirect("/users/login");
	    } else {
	      next();
	    }
	},
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

		req.flash("notice", "You've successfully signed out!");
		res.redirect("/");

		req.session.destroy(function (err) {
		    res.redirect('/'); //Inside a callback… bulletproof!
		});
   	},
   	signup(req, res, next){
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		const password_conf = req.body.password_conf;
		
		if (password != password_conf) {
			req.flash("notice", "Password confirmation does not match.  Please try again.")
			res.redirect("/users/signup.ejs");
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
					req.flash("notice", "You are now signed up and can log in!")
					res.redirect("/users/login.ejs");
				})
				.catch(err => {
					res.render('users/signup.ejs', { title: 'Signup', error: "There were problems with the sign up.  Please try again." });
				});
		}
   	},
   	login(req, res, next){
	  passport.authenticate("local")(req, res, function () {
	    if(!req.user){
	      	req.flash("notice", "Log in failed. Please try again.")
	      	res.redirect("/users/login.ejs");
	    } else {
	      	req.flash("notice", "You've successfully signed in!");
	      	res.redirect("/");
	    }
	  })
	},
	show(req, res, next){
		User.findById(req.params.id)
	    .then(user => {
			res.redirect('users/show.ejs');
		})
	    .catch(err => {
	    	req.flash("error", err);
	    	res.redirect("/");
	    });
	},
	edit(req, res, next){
		User.findById(req.params.id)
	    .then(user => {
			res.render('users/edit.ejs', {user});
		})
	    .catch(err => {
	    	req.flash("error", err);
	    	res.redirect("/");
	    })
   	}
}