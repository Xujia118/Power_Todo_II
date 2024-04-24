const users = {};

// If user exists in db, return all his tasks data
// else create a new user

function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

module.exports = {
  isValid,
}
