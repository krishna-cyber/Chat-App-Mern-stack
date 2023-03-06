const User = require("../models/User");
const jwt = require("jsonwebtoken");

const home = (req, res) => {
  res.send("Hello World!");
};

const registerUser = async (req, res) => {
  try {
    const { username, email } = await User.create(req.body);
    const token = jwt.sign({ username, email }, "process.env.SECRET", {
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
      .send("User Register route");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { home, registerUser };
