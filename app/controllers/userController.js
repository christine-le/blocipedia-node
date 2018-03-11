const express = require('express');
const router = express.Router();
const User = require('../models').User;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const stripe = require("stripe")(process.env.stripe_secret);

module.exports = {
	authenticate(req, res, next) {
	    if (!req.user){
	      req.flash("notice", "You need to sign in or sign up before continuing.")
	      return res.redirect("/users/login");
	    } else {
	      next();
	    }
	},
	update(req, res, next){
		const email = req.body.email;
		const password = req.body.password;
		const password_conf = req.body.password_conf;

		if (password != password_conf) {
			req.flash("notice", "Password confirmation does not match.  Please try again.")
			res.redirect(`/users/edit/${req.params.id}`);
		}
		else {

			User.update({
	   			password: req.body.password
			}, {
				where: { 
					id: req.params.id 
				}
			})
			.then(user => {
				req.flash("notice", "Password has been successly updated.")
				res.redirect(`/users/edit/${req.params.id}`);
			})
		    .catch(err => {
		    	res.render('users/edit.ejs', {error: err, user});
		    });
		}
   	},
   	upgrade(req, res, next){
		User.findById(req.params.id)
	    .then(user => {
			var stripeToken = req.body.stripeToken;
			// Charge the user's card:
			stripe.charges.create({
				amount: 1500,
			  	currency: "usd",
			  	description: "Upgrade tp premium User",
			  	source: stripeToken,
			}, function(err, charge) {
			  	user.role = 1;
			  	user.save();

			  	req.flash("notice", "You are now a premium user!");
				res.redirect("/");
			});
		})
	    .catch(err => {
	    	req.flash("notice", "Error upgrading.  Please try again.");
	    	res.redirect(`/users/edit/${req.params.id}`);
	    });
   	},
   	downgrade(req, res, next){
		User.findById(req.params.id)
	    .then(user => {
		  	user.role = 0;
		  	user.save();

		  	req.flash("notice", "You are now a standard user!");
			res.redirect("/");
		})
	    .catch(err => {
	    	req.flash("notice", "Error upgrading.  Please try again.");
	    	res.redirect(`/users/edit/${req.params.id}`);
	    });
   	},
   	logout(req, res, next){
		req.logout();
		req.flash("notice", "You've successfully signed out!");
		res.redirect("/");
   	},
   	signup(req, res, next){
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		const password_conf = req.body.password_conf;
		
		if (password != password_conf) {
			req.flash("notice", "Password confirmation does not match.  Please try again.")
			res.redirect("users/signup.ejs");
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
					res.redirect("users/login.ejs");
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
	      	res.redirect("users/login.ejs");
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