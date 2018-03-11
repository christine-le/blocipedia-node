const express = require('express');
const router = express.Router();
const Wiki = require('../app/models').Wiki;
const wikiController = require("../app/controllers/wikiController");
const userController = require("../app/controllers/userController");

router.get("/wikis", userController.authenticate, wikiController.index);
router.get("/wikis/:id", userController.authenticate, wikiController.show);
router.post("/wikis/:id/update", userController.authenticate, wikiController.update);
router.post("/wikis/:id/destroy", userController.authenticate, wikiController.destroy);
router.get("/wikis/:id/edit", userController.authenticate, wikiController.edit);

module.exports = router;