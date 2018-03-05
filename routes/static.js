const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('index.ejs');
});

router.get('/login', function(req, res){
  res.render('login.ejs', { title: 'Login' });
});

router.get('/signup', function(req, res){
	res.render('signup.ejs', { title: 'Signup' });
});

router.get('/profile', function(req, res){
	res.render('profile.ejs', {user, title: 'Profile' });
});

module.exports = router;