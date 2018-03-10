const express = require('express');
const router = express.Router();
const staticController = require("../app/controllers/staticController");

router.get("/", staticController.index);

router.get("/users/login", staticController.login);

router.get("/users/signup", staticController.signup);

module.exports = router;