const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// Routes
const predictRoutes = require("./routes/predict");
const chatRoutes = require("./routes/chat");

app.use("/api/predict", predictRoutes);
app.use("/api/chat", chatRoutes);

// Health check route
app.get("/", (req, res) => res.send("CURA API is running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Node server running at http://localhost:${PORT}`));
