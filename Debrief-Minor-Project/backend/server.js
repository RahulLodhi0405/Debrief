const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

/* =========================
   CACHE CONTROL
========================= */

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

/* =========================
   CORS CONFIG
========================= */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://debrief-olive.vercel.app",
    ],
    credentials: true,
  })
);

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

/* =========================
   TEST ROUTES
========================= */

app.get("/", (req, res) => {
  res.send("Debrief Backend API Running...");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* =========================
   DATABASE CONNECTION
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});