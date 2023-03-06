const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const { home, registerUser } = require("../controllers/controller");

router.get("/", home);

router.post("/register", registerUser);

module.exports = router;
