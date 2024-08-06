const { v4: uuidv4 } = require('uuid');
const User = require("../models/user");
const { setUser } = require("../services/auth");


async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    await User.create({
      name,
      email,
      password,
    })
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide required info!" });
    }

    // return res.status(201).json({ message: "User created successfully" });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error, please try again" });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.render("login", { error: "Invalid user or password" })
    }
    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error, please try again" });
  }
}

async function handleUserLogout(req, res) {
  try {
    res.clearCookie("uid");
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error to logout, please try again" });
  }
}

module.exports = { handleUserSignup, handleUserLogin, handleUserLogout };