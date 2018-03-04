const express = require('express');
const router = express.Router();
const User = require('../app/models').User;

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
	res.render('index.ejs');
});

router.get('/login', function(req, res){
  // res.render('login.ejs', { title: 'login' });
  res.render('login.ejs');
});

router.get('/signup', function(req, res){
  // res.render('signup.ejs', { title: 'signup' });
  res.render('signup.ejs');
});

// router.get('/', (req, res, next) => {
// 	User.findAll().then((user) => {
// 		res.render('signup', {
//       	title: 'Blocipedia',
//       	users: user
//     });
//   });
// });
