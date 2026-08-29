const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { authenticate } = require("../middleware/auth");

// Submit or Update Rating
router.post("/", authenticate, async (req, res) => {
  const { store_id, rating } = req.body;
  const user_id = req.user.id;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be 1 to 5" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO ratings (user_id, store_id, rating)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, store_id)
       DO UPDATE SET rating = $3
       RETURNING *`,
      [user_id, store_id, rating],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get my ratings
router.get("/my-ratings", authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM ratings WHERE user_id = $1",
      [req.user.id],
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
