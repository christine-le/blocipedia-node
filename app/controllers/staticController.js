const express = require('express');
const router = express.Router();

module.exports = {
	index(req, res, next){
		res.render("index.ejs", {title: "Welcome to Bloccit"});
	},
	login(req, res, next){
	  res.render('users/login.ejs', { title: 'Login' });
	},
	signup(req, res, next){
	  res.render('users/signup.ejs', { title: 'Signup' });
	}
}
