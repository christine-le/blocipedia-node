const express = require('express');
const router = express.Router();
const userController = require("../app/controllers/userController");

router.post("/user/update", userController.update);

router.post("/user/upgrade", userController.upgrade);

router.get("/user/logout", userController.logout);

router.post("/user/signup", userController.signup);

router.post("/user/login", userController.login);

module.exports = router;