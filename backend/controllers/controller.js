const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

//define a function that generates a jwt token
function generateAccessToken(username, id) {
  // Sign the username with a secret key and an expiration time
  return jwt.sign({ username, id }, process.env.SECRET, {
    expiresIn: "1800s",
  });
}

const home = (req, res) => {
  res.send("Hello World!");
};

const registerUser = async (req, res) => {
  try {
    const { _id, username } = await User.create(req.body).catch((err) => {
      throw err;
    });
    const token = generateAccessToken(username, _id);
    //responding to client with a cookie with expiration time of 30 minutes
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      expires: new Date(Date.now() + 900000),
    });
    //sending the user id and username to the client
    res.status(201).json({
      id: _id,
      username,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  let { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res.status(400).json({ error: "Invalid credentials" });
            }
            const token = generateAccessToken(user.username, user._id);
            jwt.verify(token, process.env.SECRET, (err, user) => {
              if (err) {
                return res.status(403).json({ error: "Forbidden" });
              }
              if (user) {
                res.cookie("token", token, {
                  httpOnly: true,
                  sameSite: "none",
                  secure: true,
                  path: "/",
                  expires: new Date(Date.now() + 900000),
                });
                return res.status(200).json(user);
              }
            });
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
};

//profile
const profile = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ error: "Forbidden" });
    }
    return res.status(200).json({ username: user.username, id: user.id });
  });
};

module.exports = { home, registerUser, loginUser, profile };
