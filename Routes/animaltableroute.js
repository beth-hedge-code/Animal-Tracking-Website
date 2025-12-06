const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

router.use(express.json()); 
router.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database("./Animals.db");

//get (read in CRUD) specafic data form tblanimals
router.get("/api/animals", (req, res) => {
  const { userid } = req.query;
  const sql = "SELECT * FROM tblAnimals WHERE userID = ?";
  db.all(sql, [userid], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
});


router.post("/api/animals", (req, res) => {
  const { animalName, animalSpecies, animalBreed, disposition, feed, locationID, userID } = req.body;

  // Get the last animalID
  db.get("SELECT MAX(animalID) as lastID FROM tblAnimals", [], (err, row) => {
    if (err) return res.status(500).json({ error: "Database error" });

    let newID = (row.lastID || 0) + 1; // If table empty, start at 1

    const sql = `
      INSERT INTO tblAnimals 
      (animalID, animalName, animalSpecies, animalBreed, disposition, feed, locationID, userID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [newID, animalName, animalSpecies, animalBreed, disposition, feed, locationID, userID], function(err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Failed to add animal" });
      }
      res.json({ animalID: newID });
    });
  });
});





module.exports = router;


