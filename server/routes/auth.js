const sessions = require("../models/sessions");
const users = require("../models/users");

function authenticate(req, res) {
  const sid = req.cookies.sid;
  const userId = sid ? sessions.getSessionUser(sid) : "";

  if (!sid) {
    res.status(401).json({ error: "auth-missing" });
    return "";
  }

  return userId;
}

module.exports = authenticate;