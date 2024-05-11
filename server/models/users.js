const { User } = require("../schema");
const crypto = require("crypto");

function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

// Sign up: create user
async function createUser(newUser) {
  // prevent duplicate
  const username = newUser.username;
  const email = newUser.email;
  const password = newUser.password;

  const userExists = await User.exists({ $or: [{ username }, { email }] });
  console.log("User exists:", username);
  if (userExists) {
    return false;
  }

  try {
    const createUser = {
      username,
      password: hashPassword(password),
      email,
    };

    const createResult = await User.create(createUser);
    return !!createResult;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function hashPassword(password) {
  const hashedPassword = crypto.createHash("sha256").digest("hex");
  return hashedPassword;
}

// Login: fetch userId, match it to sid
async function loginUser(username, password) {
  // compare hashword
  const hashedPassword = crypto.createHash("sha256").digest("hex");

  
  
}

// Logout: clear sid
async function logoutUser(username) {}

module.exports = {
  isValid,
  createUser,
  loginUser,
  logoutUser,
};
