const express = require('express');
const router = express.Router();
const Wiki = require('../models').Wiki;
const markdown = require( "markdown" ).markdown;

module.exports = {
	index(req, res, next){
		Wiki.findAll({
	    	where: {
	    		private: false
	    	}
	    })
	    .then(wikis => {
			res.render('wikis/index.ejs', { wikis });
		})
	    .catch(err => {
	    	res.render('wikis/index.ejs', { title: 'Wikis'});
	    });
   	},
   	show(req, res, next){
		Wiki.findById(req.params.id)
	    .then(wiki => {
	    	wiki.body = markdown.toHTML(wiki.body);
			res.render('wikis/show.ejs', {wiki});
		})
	    .catch(err => {
	    	res.render('wikis/show.ejs', {error: err});
	    });
   	},
   	update(req, res, next){
   		Wiki.update({
   			title: req.body.title,
   			body: req.body.body
		}, {
			where: { 
				id: req.params.id 
			}
		})
		.then(wiki => {
			res.redirect(`/wikis/${req.params.id}`);
		})
	    .catch(err => {
	    	res.render('wikis/show.ejs', {error: err});
	    });
   	},
   	edit(req, res, next){
		Wiki.findById(req.params.id)
	    .then(wiki => {
			res.render('wikis/edit.ejs', { wiki });
		})
	    .catch(err => {
	    	res.render('wikis/edit.ejs', {error: err});
	    });
   	},
   	destroy(req, res, next){
		Wiki.destroy({where: {id: req.params.id}})
	    .then(wiki => {
	    	req.flash("notice", "Wiki was deleted successfully.")
			res.redirect('/wikis');
		})
	    .catch(err => {
	    	res.render('wikis/index.ejs', {error: err});
	    });
   	},
}
