const express = require('express');
const router = express.Router();
const Wiki = require('../models').Wiki;
const User = require('../models').User;
const Collaborator = require('../models').Collaborator;
const markdown = require( "markdown" ).markdown;

module.exports = {
	index(req, res, next){
		// Wiki.scope('defaultScope', { method: ['getByOwner', req.params.userId]}).findAll({
		Wiki.findAll({
	    	// where: {
	    	// 	private: false
	    	// }

	    	// role 0 = private: false 
	    	// role 1 (premium) = private: false or owner or are collaborators
	    	// role 2 (admin) = show all
	    })
	    .then(wikis => {
			res.render('wikis/index.ejs', {wikis});
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
   		if (!req.body.private)
   			req.body.private = false;

   		Wiki.update({
   			title: req.body.title,
   			body: req.body.body,
   			private: req.body.private
		}, {
			where: { 
				id: req.params.id 
			}
		})
		.then(wiki => {
			res.redirect(`/wikis/${req.params.id}`);
		})
	    .catch(err => {
	    	req.flash("error", "Error saving wiki.  Please try again.")
	    	res.redirect(`/wikis/${req.params.id}/edit`);
	    });
   	},
   	edit(req, res, next){
		Wiki.findById(req.params.id,{
			include: [
     			{model: Collaborator, as: "collaborators", include: [
     			{model: User}
     		]},
		]})
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
   	}
}
