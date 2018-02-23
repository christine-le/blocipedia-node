const express = require('express');
const router = express.Router();
const Wiki = require('../app/models').Wiki;

// module.exports = (app) => {
//   app.use('/', router);
// };

router.get('/wikis', (req, res, next) => {
    Wiki.findAll({
    	where: {
    		private: false
    	}
    })
    .then(wikis => {
    	console.log('wikis', wikis);
		res.render('wiki.jade', { title: 'Wikis'}, wikis);
	})
    .catch(err => {
    	res.render('wiki.jade', { title: 'Wikis'});
    });
});


module.exports = router;