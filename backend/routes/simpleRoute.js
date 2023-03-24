const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const {
  home,
  registerUser,
  loginUser,
  profile,
  getMessages,
  getusers,
  logout,
} = require("../controllers/controller");

router.get("/", home);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", profile);

router.post("/messages/", getMessages);

router.get("/users", getusers);

router.get("/logout", logout);

module.exports = router;
