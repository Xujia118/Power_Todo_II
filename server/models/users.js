const User = require("../schemas/User");

async function userExists(username) {
  const existingUser = await User.findOne({ username });
  return existingUser;
}

function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

module.exports = {
  isValid,
  userExists,
};