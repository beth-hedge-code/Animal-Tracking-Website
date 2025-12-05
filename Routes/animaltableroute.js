const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database("./Animals.db");
//get (read in CRUD) specafic data form tblanimals
router.get("/api/animals", (req, res) => {
  const sql = "SELECT animalID, animalName FROM tblAnimals";
  db.all(sql, [], (err, rows) => {
    if (err) {
      //500 error code if there's touble getting data
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

module.exports = router;

