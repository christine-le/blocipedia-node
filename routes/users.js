const express = require('express');
const router = express.Router();
const userController = require("../app/controllers/userController");

router.post("/users/update", userController.update);

router.post("/users/upgrade", userController.upgrade);

router.get("/users/logout", userController.logout);

router.post("/users/signup", userController.signup);

router.post("/users/login", userController.login);

router.get("/users/:id", userController.show);

router.get("/users/edit/:id", userController.edit);

module.exports = router;