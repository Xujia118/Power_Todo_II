const uuid = require("uuid").v4;

const sessions = {};

function addSession(userId) {
  const sid = uuid();
  sessions[sid] = {
    userId,
  };
  return sid;
}

function getSessionUser(sid) {
    return sessions[sid]?.userId;
}

function deleteSession(sid) {
    delete sessions[sid];
}

module.exports = {
    addSession,
    getSessionUser,
    deleteSession
}
