const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");

router.post("/auth/login", AuthController.login);

module.exports = router;