const express = require('express');
const router = express.Router();
const Wiki = require('../models').Wiki;
const markdown = require( "markdown" ).markdown;

module.exports = {
	show(req, res, next){
		Wiki.findAll({
	    	where: {
	    		private: false
	    	}
	    })
	    .then(wikis => {
			res.render('wikis/show.ejs', { wikis, title: 'Wikis'});
		})
	    .catch(err => {
	    	res.render('wikis/show.ejs', { title: 'Wikis'});
	    });
   	},
   	wiki(req, res, next){
		Wiki.findById(req.params.id)
	    .then(wiki => {
	    	wiki.body = markdown.toHTML(wiki.body);
			res.render('wikis/wiki.ejs', {wiki, title: 'Wiki'});
		})
	    .catch(err => {
	    	res.render('wikis/wiki.ejs', { title: 'Wiki'});
	    });
   	}
}