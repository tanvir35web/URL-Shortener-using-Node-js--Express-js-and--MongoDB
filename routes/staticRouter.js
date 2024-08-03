const express = require('express');
const URL = require('../models/url');
const { restrictToLoggedInUserOnly } = require('../middlewares/auth');
const {handleUserLogout} = require("../controllers/user");
const router = express.Router();

router.get("/", restrictToLoggedInUserOnly, async (req, res) => {
  const allUrl = await URL.find({ createdBy: req.user?._id });
  return res.render("home", {
    urls: allUrl,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
})

router.get("/login", async (req, res) => {
  return res.render("login");
});

router.get("/logout", handleUserLogout, async (req, res) => {
  res.redirect("/");
});
module.exports = router;