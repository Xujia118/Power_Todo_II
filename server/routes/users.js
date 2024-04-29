const express = require("express");
const router = express.Router();
const User = require("../schemas/User");

// Import files
const sessions = require("../models/sessions");
const users = require("../models/users");

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
  const sid = sessions.addSession(username);

  try {
    // Prevent duplicate users
    const userExists = users.userExists(username);
    if (userExists) {
      res.cookie("sid", sid);
      return res.status(200).json({ username });
    }

    // Create new user
    // Some checks
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
