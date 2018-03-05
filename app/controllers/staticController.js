const express = require('express');
const router = express.Router();

module.exports = {
	index(req, res, next){
		res.render('index.ejs');
   	},
   	login(req, res, next){
		res.render('login.ejs', { title: 'Login' });
   	},
   	signup(req, res, next){
		res.render('signup.ejs', { title: 'Signup' });
   	},
   	profile(req, res, next){
		res.render('profile.ejs', { title: 'Profile' });
   	}
}
