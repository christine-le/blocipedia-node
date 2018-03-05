const express = require('express');
const router = express.Router();
const staticController = require("../app/controllers/staticController");

router.get("/", staticController.index);

router.get("/user/login", staticController.login);

router.get("/user/signup", staticController.signup);

router.get("/user/profile", staticController.profile);

module.exports = router;