const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    //responding to client
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      })
      .status(201)
      .json({
        id: _id,
        username,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.findOne({ username })
      .then(async (user) => {
        const { _id, username, password: userpassword } = user;
        await bcrypt
          .compare(password, userpassword)
          .then((result) => {
            if (!result) {
              res.status(400).json({ error: "Invalid username or password" });
            }
            const token = generateAccessToken(username, _id);

            //responding to client
            res.cookie("token", token, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
              path: "/",
            });
            //sending the user id and username to the client
            res.status(200).json({
              id: _id,
              username,
            });
          })
          .catch((err) => {
            res.status(400).json({ error: err.message });
          });
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { home, registerUser, loginUser };
