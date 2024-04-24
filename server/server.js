require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Import files
const sessions = require("./sessions");
const users = require("./users");

// Connect to DB
const connectDB = require("./connectDB");
connectDB();

// Cors
const corsOptions = {
  origin: "http://localhost:5173", // Replace with the URL of your React app
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
// app.use(express.static('./dist'))
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));


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

app.post("/api/v1/session", (req, res) => {
  const { username } = req.body;

  if (!users.isValid(username)) {
    return res.status(401).json({ error: "required-username" });
  }
  
  // Other checks like "dog"

  const sid = sessions.addSession(username);
  res.cookie("sid", sid);
  res.status(201).json({ username });
});

// Routes
// const taskRouter = require("./routes/tasks");
// app.use("/api/v1/tasks", taskRouter);

// const noteRouter = require("./routes/notes");
// app.use("./api/v1/tasks", noteRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
