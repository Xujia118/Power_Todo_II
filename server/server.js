require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

// Connect to DB
const connectDB = require("./connectDB");
connectDB();

// Middleware
// app.use(express.static('./dist'))
app.use(express.json());
app.use(cookieParser());

// Routes
const userRouter = require("./routes/users");
app.use("/api/v1/session", userRouter);

const taskRouter = require("./routes/tasks");
app.use("/api/v1/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
