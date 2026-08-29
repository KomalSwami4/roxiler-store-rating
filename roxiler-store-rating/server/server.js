/*
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const authRoutes = require("./routes/auth");
const storeRoutes = require("./routes/store");
const ratingRoutes = require("./routes/rating");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Roxiler Store Rating API Running");
});

// Test DB
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("DB Connection Failed:", err.message);
  } else {
    console.log("DB Connected:", res.rows[0].now);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

console.log("Testing routes...");

try {
  const auth = require("./routes/auth");
  console.log("auth.js:", typeof auth, auth);
} catch (e) {
  console.log("auth.js FAILED", e.message);
}

try {
  const store = require("./routes/store");
  console.log("store.js:", typeof store, store);
} catch (e) {
  console.log("store.js FAILED", e.message);
}

try {
  const rating = require("./routes/rating");
  console.log("rating.js:", typeof rating, rating);
} catch (e) {
  console.log("rating.js FAILED", e.message);
}

try {
  const admin = require("./routes/admin");
  console.log("admin.js:", typeof admin, admin);
} catch (e) {
  console.log("admin.js FAILED", e.message);
}

app.listen(5000, () => console.log("test done"));
