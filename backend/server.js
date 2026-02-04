const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const wordRoutes = require("./routes/wordRoutes");
const gameRoutes = require("./routes/gameRoutes");
const progressRoutes = require("./routes/progressRoutes");

const app = express();

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/words", wordRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/progress", progressRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
