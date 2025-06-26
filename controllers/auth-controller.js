const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const generateTokens = require("../utils/generateTokens");
const expressSession = require("express-session");
const flash = require("connect-flash");
const { model } = require("mongoose");
module.exports.registerUser = async (req, res) => {
    try {
    const { name, email, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const isUser = await userModel.findOne({email});
        if(isUser){
            res.send("User already exist");
        }
        else{
        if (err) {
          return res.send(error.message);
        } else {
          const createduser = await userModel.create({
            name,
            email,
            password: hash,
          });

          let token = generateTokens(createduser);
          res.cookie("token", token);
          res.status(201);
          res.redirect('/shop')
        }
    }
      });
    });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      req.flash("error","Incorrect email or password");
      return res.redirect("/");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.flash("error","Incorrect email or password");
      return res.redirect("/");

    }

    const token = generateTokens(user);
    res.cookie("token", token, { httpOnly: true });
    res.status(200);
    res.redirect("/shop");
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).send("Something went wrong");
  }
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  req.flash("success", "You have been logged out successfully");
  return res.redirect("/");
};
