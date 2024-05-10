const { User } = require("../schema");
const sha = require("js-sha256");

function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

// Sign up: create user
async function createUser(username, password, email) {
  // prevent duplicate
  const userExists = await User.exists({ $or: [{ username }, { email }] });
  console.log("User exists:", username);
  if (userExists) {
    return false;
  }

  try {
    const newUser = {
      username,
      password: sha(password),
      email,
    };

    const createResult = await User.create(newUser);
    return !!createResult;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

createUser('Alice', 'aliceinwonderland', 'alice@mail.com')


// Login: fetch userId, match it to sid
async function loginUser(username) {
  // compare hashword
}

// Logout: clear sid
async function logoutUser(username) {}

module.exports = {
  isValid,
  createUser,
  loginUser,
  logoutUser,
};
