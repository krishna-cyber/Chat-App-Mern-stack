const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const { home, registerUser, loginUser } = require("../controllers/controller");

router.get("/", home);

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
