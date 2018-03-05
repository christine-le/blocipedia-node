const express = require('express');
const router = express.Router();
const Wiki = require('../models').Wiki;
const markdown = require( "markdown" ).markdown;

module.exports = {
	wiki_list(req, res, next){
		Wiki.findAll({
	    	where: {
	    		private: false
	    	}
	    })
	    .then(wikis => {
			res.render('wiki_all.ejs', { wikis, title: 'Wikis'});
		})
	    .catch(err => {
	    	res.render('wiki_all.ejs', { title: 'Wikis'});
	    });
   	},
   	wiki(req, res, next){
		Wiki.findById(req.params.id)
	    .then(wiki => {
	    	wiki.body = markdown.toHTML(wiki.body);
			res.render('wiki.ejs', {wiki, title: 'Wiki'});
		})
	    .catch(err => {
	    	res.render('wiki.ejs', { title: 'Wiki'});
	    });
   	}
}