const express = require("express");
const router = express.Router();

// Import files
const { User } = require("../schema");
const users = require("../models/users");
const sessions = require("../models/sessions");
const authenticate = require('./auth');

// Routes
router.get("/", (req, res) => {
  const username = authenticate(req, res);
  if (!username) {
    return;
  }
  res.status(200).json({ username });
});

router.post("/", async (req, res) => {
  const { username } = req.body;
  const sid = sessions.addSession(username);

  try {
    // Prevent duplicate users
    const userExists = await User.exists({username});
    if (userExists) {
      res.cookie("sid", sid);
      return res.status(200).json({ username });
    }

    // Create new user
    if (!users.isValid(username)) {
      return res.status(401).json({ error: "required-username" });
    }
    // Put other checks here like username not too long

    const newUser = await User.create({ username });
    res.cookie("sid", sid);
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/", async (req, res) => {
  const sid = req.cookies.sid;

  const username = sid ? sessions.getSessionUser(sid) : "";

  if (sid) {
    res.clearCookie("sid");
  }

  if (username) {
    sessions.deleteSession(sid);
  }

  res.json({ loggedOut: true });
});

module.exports = router;