const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { authenticate, authorize } = require("../middleware/auth");

// Get all stores with rating
router.get("/", authenticate, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, u.name as owner_name,
      COALESCE(AVG(r.rating),0) as avg_rating,
      COUNT(r.id) as total_ratings
      FROM stores s
      LEFT JOIN users u ON s.owner_id = u.id
      LEFT JOIN ratings r ON r.store_id = s.id
      GROUP BY s.id, u.name
      ORDER BY s.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
