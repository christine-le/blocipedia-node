const express = require('express');
const router = express.Router();
const staticController = require("../app/controllers/staticController");

router.get("/", staticController.index);

module.exports = router;