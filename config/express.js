const express = require('express');
const glob = require('glob');

const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const static = require('../routes/static');
const users = require('../routes/users');
const wikis = require('../routes/wikis');
const collaborators = require('../routes/collaborators');

const passport = require('passport');
const session = require("express-session");
const flash = require("express-flash");

module.exports = (app, config) => {
  require("dotenv").config();
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  app.use(session({
    secret: process.env.cookie_secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }));
  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session());
  require('./passport');

  // Set user variable for templates
  app.use((req,res,next) => {
    res.locals.user = req.user;
    next();
  })

  app.use(static);
  app.use(users);
  app.use(wikis);
  app.use(collaborators);

  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });



  return app;
};
