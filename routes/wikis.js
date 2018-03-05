const express = require('express');
const router = express.Router();
const Wiki = require('../app/models').Wiki;
const wikiController = require("../app/controllers/wikiController");

router.get("/wikis", wikiController.wiki_list);

router.get("/wiki/:id", wikiController.wiki);

module.exports = router;