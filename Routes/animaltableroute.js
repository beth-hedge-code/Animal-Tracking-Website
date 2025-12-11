// This page shows off the route side of CRUD
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

router.use(express.json()); 
router.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database("./Animals.db");

// READS animals linking to userID
router.get("/api/animals", (req, res) => {
  const { userid } = req.query;
  const sql = "SELECT * FROM tblAnimals WHERE userID = ?";
  db.all(sql, [userid], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
});

// CREATES a new animal and stores it in the database
router.post("/api/animals", (req, res) => {
  const { animalName, animalSpecies, animalBreed, disposition, feed, locationID, userID } = req.body;

  // Gets the last animalID
  db.get("SELECT MAX(animalID) as lastID FROM tblAnimals", [], (err, row) => {
    if (err) return res.status(500).json({ error: "Database error" });

    //Adding 1 to the Max animal ID makes all IDs Unique
    let newID = (row.lastID || 0) + 1; // If table empty, start at 1

    //Inserts new information into the database
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

// DELETES an animal by ID
router.delete("/api/animals/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM tblAnimals WHERE animalID = ?";
  db.run(sql, [id], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Failed to delete animal" });
    }

    if (this.changes === 0) {
      // No rows deleted, ID not found
      return res.status(404).json({ error: `Animal with ID ${id} not found` });
    }

    res.json({ message: `Animal with ID ${id} deleted` });
  });
});


// UPDATES an animal by ID
router.put("/api/animals/:id", (req, res) => {
  const animalID = parseInt(req.params.id, 10); // ensure integer
  const { animalName, animalSpecies, animalBreed, disposition, feed, locationID, userID } = req.body;

  const sql = `
    UPDATE tblAnimals
    SET animalName = ?, animalSpecies = ?, animalBreed = ?, disposition = ?, feed = ?, locationID = ?
    WHERE animalID = ? AND userID = ?
  `;

  db.run(
    sql,
    [animalName, animalSpecies, animalBreed, disposition, feed, locationID, animalID, userID],
    function(err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Failed to update animal" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: `Animal with ID ${animalID} not found or does not belong to user ${userID}` });
      }

      res.json({ message: `Animal with ID ${animalID} updated` });
    }
  );
});





module.exports = router;


