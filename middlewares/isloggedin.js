const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const cookie = require("cookie-parser");

const isloggedin = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    req.flash("error", "You are not logged in");
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await userModel.findOne({ email: decoded.email }).select("-password");
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect('/');
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error("Token verification failed:", error);
    req.flash("error", "Invalid or expired token");
    return res.redirect('/');
  }
};

module.exports = isloggedin;
