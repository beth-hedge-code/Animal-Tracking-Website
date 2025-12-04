const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

//Used for testing if the route is working
console.log("animalfact.js Works!")

//Allows use of the database
const db = new sqlite3.Database("./Animals.db");

// Route to get animal description
router.get('/api/animaldes/:animalid', (req, res) => {
    const animalID = req.params.animalid;

    const sql = `
        SELECT a.animalID, a.animalName, a.animalSpecies, a.animalBreed, a.disposition, a.feed, 
               ad.description, ab.DOB, ab.Sire, ab.Dam, ab.birthWeight, l.locationName
        FROM tblAnimals a
        LEFT JOIN tblAnimalDes ad ON a.animalID = ad.animalID
        LEFT JOIN tblAnimalBirth ab ON a.animalID = ab.animalID
        LEFT JOIN tblLocation l ON a.locationID = l.locationID
        WHERE a.animalID = ?
    `;

    db.get(sql, [animalID], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Animal not found" });
        res.json(row);
    });
});

//Exports Router
module.exports = router; 
