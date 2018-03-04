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
		res.render('wiki.ejs', {wikis, title: 'Wikis'});
	})
    .catch(err => {
    	res.render('wiki.ejs', { title: 'Wikis'});
    });
});


module.exports = router;