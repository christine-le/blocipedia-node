const express = require('express');
const router = express.Router();
const User = require('../app/models').User;

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
	res.render('index.jade');
});

router.get('/login', function(req, res){
  res.render('login.jade', { title: 'login' });
});

router.get('/signup', function(req, res){
  res.render('signup.jade', { title: 'signup' });
});

// router.get('/', (req, res, next) => {
// 	User.findAll().then((user) => {
// 		res.render('signup', {
//       	title: 'Blocipedia',
//       	users: user
//     });
//   });
// });
