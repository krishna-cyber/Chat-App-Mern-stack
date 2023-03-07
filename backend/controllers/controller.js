const User = require("../models/User");
const jwt = require("jsonwebtoken");

const home = (req, res) => {
  res.send("Hello World!");
};

const registerUser = async (req, res) => {
  try {
    const { _id, username } = await User.create(req.body).catch((err) => {
      throw err;
    });
    const token = jwt.sign({ username, _id }, "process.env.SECRET", {
      expiresIn: "1h",
    });
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
const loginUser = async (req, res) => {};

module.exports = { home, registerUser, loginUser };
