const sessions = require("../models/sessions");
const users = require("../models/users");

function authenticate(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return "";
  }

  return username;
}

module.exports = authenticate;