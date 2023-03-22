const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const {
  home,
  registerUser,
  loginUser,
  profile,
  getMessages,
} = require("../controllers/controller");

router.get("/", home);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", profile);

router.get("/messages/", getMessages);

module.exports = router;
