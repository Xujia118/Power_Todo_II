const express = require('express');
const router = express.Router();
const User = require("../models/User");

// Import files
const sessions = require("../sessions");
const users = require("../users");

// Get valid session
function authenticate(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return "";
  }

  return username;
}

router.get("/", (req, res) => {
  const username = authenticate(req, res);
  if (!username) {
    return;
  }
  res.status(200).json({ username });
});

router.post("/", async (req, res) => {
  const { username } = req.body;

  try {
    // Prevent duplicate users
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(200).json({ existingUser });
    }

    // Create new user
    if (!users.isValid(username)) {
      return res.status(401).json({ error: "required-username" });
    }

    // Other checks here like username not too long

    const sid = sessions.addSession(username);
    const newUser = await User.create({ username });
    res.cookie("sid", sid);
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;