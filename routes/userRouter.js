const express = require("express");
const router = express.Router();
const {registerUser} = require("../controllers/auth-controller");
const {loginUser} = require("../controllers/auth-controller");
const {logoutUser} = require("../controllers/auth-controller");
const isloggedin = require('../middlewares/isloggedin')

if (process.env.NODE_ENV === "development") {
  console.log("Development mode: User router is active");
}
router.get("/", (req, res) => {
  const error = req.flash("error");
  res.render("index", {error});
});
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout",isloggedin,logoutUser);

module.exports = router;
