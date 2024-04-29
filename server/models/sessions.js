const uuid = require("uuid").v4;

// We don't need to store sessions, because sid will be destroyed at logout
// But we do need to store users. So at every login, we need to check
// if the user exists or not. Retrieve data if the user exists, or create a new one

const sessions = {};

function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
}

function getSessionUser(sid) {
    return sessions[sid]?.username;
}

function deleteSession(sid) {
    delete sessions[sid];
}

module.exports = {
    addSession,
    getSessionUser,
    deleteSession
}
