const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

// Open DB
const db = new sqlite3.Database("./Animals.db");

// Get vet visit info for an animal by animalID
router.get("/api/vet/:animalid", (req, res) => {
    const animalID = req.params.animalid;

    const sql = `
        SELECT vv.vetVisitID, vv.visitDate, vv.weight, 
               v.VetID, v.name as vetName, v.role as vetRole, v.phone, v.address, v.city, v.state, v.zip_code, v.license,
               vvd.description as visitDescription
        FROM tblVetVisit vv
        LEFT JOIN tblVet v ON vv.vetID = v.VetID
        LEFT JOIN tblVetVisitDesc vvd ON vv.vetVisitID = vvd.vetVisitID
        WHERE vv.animalID = ?
        ORDER BY vv.visitDate DESC
    `;

    db.all(sql, [animalID], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!rows || rows.length === 0) return res.status(404).json({ error: "No vet visits found" });

        // For each visit, get vaccinations
        const visitsWithVaccinations = [];
        let pending = rows.length;

        rows.forEach(visit => {
            db.all(
                "SELECT name FROM tblVetVaccination WHERE vetVisitID = ?",
                [visit.vetVisitID],
                (err2, vaccs) => {
                    if (err2) return res.status(500).json({ error: err2.message });
                    visit.vaccinations = vaccs.map(v => v.name);
                    visitsWithVaccinations.push(visit);
                    pending--;
                    if (pending === 0) res.json(visitsWithVaccinations);
                }
            );
        });
    });
});

module.exports = router;
