const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const {
  home,
  registerUser,
  loginUser,
  profile,
} = require("../controllers/controller");

router.get("/", home);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", profile);

module.exports = router;
