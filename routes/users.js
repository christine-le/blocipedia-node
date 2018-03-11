const express = require('express');
const router = express.Router();
const userController = require("../app/controllers/userController");
var passport = require("passport");

router.post("/users/:id/update", userController.authenticate, userController.update);
router.post("/users/upgrade", userController.authenticate, userController.upgrade);
router.get("/users/logout", userController.logout);
router.post("/users/signup", userController.signup);
router.post("/users/login", userController.login);
router.get("/users/:id", userController.authenticate, userController.show);
router.get("/users/edit/:id", userController.authenticate, userController.edit);

module.exports = router;