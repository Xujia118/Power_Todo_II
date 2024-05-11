const express = require("express");
const router = express.Router();

// Import files
const { User } = require("../schema");
const users = require("../models/users");
const sessions = require("../models/sessions");
const authenticate = require("./auth");

// Routes
router.get("/", (req, res) => {
  const username = authenticate(req, res);
  if (!username) {
    return;
  }
  res.status(200).json({ username });
});

// Create user
router.post("/register", async (req, res) => {
  const { newUser } = req.body; 

  try {
    const userIsCreated = await users.createUser(newUser);

    if (userIsCreated) {
      return res.status(201).json({ message: "User created successfully" });
    } else {
      logger.error("User creation failed");
      return res.status(400).json({ error: "Invalid request data" });
    }
  } catch (err) {
    console.log("User creation failed with error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Login user
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const sid = sessions.addSession(username);

  try {
    // Prevent duplicate users
    const userExists = await User.exists({ username });
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
