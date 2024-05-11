const express = require("express");
const router = express.Router();

// Import files
const { User } = require("../schema");
const users = require("../models/users");
const sessions = require("../models/sessions");
const authenticate = require("./auth");

// Routes
router.get("/", (req, res) => {
  const userId = authenticate(req, res);
  if (!userId) {
    return;
  }
  res.status(200).json({ userId });
});

// Create user
router.post("/register", async (req, res) => {
  const { newUser } = req.body;


  // TODO: add some checks here to control username and password

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
  const { credentials } = req.body;

  try {
    const userId = await users.loginUser(credentials);

    if (userId === "Invalid username or password") {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    const sid = sessions.addSession(userId);
    res.cookie("sid", sid);
    res.status(200).json({ userId })
  } catch (err) {
    console.log(err);
    throw err;
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
