const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { authenticate, authorize } = require("../middleware/auth");
const bcrypt = require("bcryptjs");

router.get(
  "/dashboard",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const stores = await pool.query("SELECT COUNT(*) FROM stores");
    const ratings = await pool.query("SELECT COUNT(*) FROM ratings");
    res.json({
      users: users.rows[0].count,
      stores: stores.rows[0].count,
      ratings: ratings.rows[0].count,
    });
  },
);

router.get("/users", authenticate, authorize(["admin"]), async (req, res) => {
  const result = await pool.query(
    "SELECT id, name, email, address, role FROM users ORDER BY id",
  );
  res.json(result.rows);
});

router.post(
  "/add-user",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    const { name, email, password, address, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password, address, role) VALUES ($1,$2,$3,$4,$5) RETURNING id, name, email, role",
      [name, email, hashed, address, role],
    );
    res.json(result.rows[0]);
  },
);

router.post(
  "/add-store",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    const { name, email, address, owner_id } = req.body;
    const result = await pool.query(
      "INSERT INTO stores (name, email, address, owner_id) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, address, owner_id],
    );
    res.json(result.rows[0]);
  },
);

router.get("/stores", authenticate, authorize(["admin"]), async (req, res) => {
  const result = await pool.query("SELECT * FROM stores");
  res.json(result.rows);
});

module.exports = router;
