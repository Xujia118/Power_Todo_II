const User = require("../schemas/User");

const users = {};

// We need to store users. So at every login, we need to check
// if the user exists or not. Retrieve data if the user exists, or create a new one

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
