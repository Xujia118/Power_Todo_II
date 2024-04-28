require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

// Import files
const sessions = require("./sessions");
const users = require("./users");


// Temporary. Make sure it works here before moving user Router out
const User = require('./models/User');

// Connect to DB
const connectDB = require("./connectDB");
connectDB();

// Middleware
// app.use(express.static('./dist'))
app.use(express.json());
app.use(cookieParser());

// Get valid session
function authenticate(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return "";
  }

  return username;
}

app.get("/api/v1/session", (req, res) => {
  const username = authenticate(req, res);
  if (!username) {
    return;
  }
  res.status(200).json({ username });
});


// Temporarily leave out the checks
// if (!users.isValid(username)) {
//   return res.status(401).json({ error: "required-username" });
// }
// Other checks like "dog"

app.post("/api/v1/session", async (req, res) => {
  const { username } = req.body;
  
  try {
    const sid = sessions.addSession(username);
    const newUser = await User.create({ username });

    res.cookie("sid", sid);
    res.status(201).json({ newUser });

  } catch(err) {
    res.status(400).json({ error: err.message});
  }
});


// if a user exists, get all his data
// else create a new user
// Of course, we need user creation logic
// So today we need to be able to create a new user








// Routes
// const taskRouter = require("./routes/tasks");
// app.use("/api/v1/tasks", taskRouter);

// const noteRouter = require("./routes/notes");
// app.use("./api/v1/tasks", noteRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
