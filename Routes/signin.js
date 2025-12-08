const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

const db = new sqlite3.Database("./Animals.db");

router.post("/vetvisit", (req, res) => {
    const { animalID, vetID, newVet, visitDate, weight, visitDescription, vaccinations } = req.body;

    const insertVisit = (finalVetID) => {
        db.run(
            `INSERT INTO tblVetVisit (animalID, vetID, visitDate, weight) VALUES (?, ?, ?, ?)`,
            [animalID, finalVetID, visitDate, weight],
            function() {
                const vetVisitID = this.lastID;

                db.run(
                    `INSERT INTO tblVetVisitDesc (vetVisitID, description) VALUES (?, ?)`,
                    [vetVisitID, visitDescription]
                );

                if (vaccinations && vaccinations.length > 0) {
                    vaccinations.forEach(vac => {
                        if (vac.trim() !== "") {
                            db.run(
                                `INSERT INTO tblVetVaccination (vetVisitID, name) VALUES (?, ?)`,
                                [vetVisitID, vac.trim()]
                            );
                        }
                    });
                }

                res.json({ success: true, vetVisitID });
            }
        );
    };

    if (newVet) {
        db.run(
            `INSERT INTO tblVet (name, role, phone, address, city, state, zip_code, license) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                newVet.name,
                newVet.role,
                newVet.phone,
                newVet.address,
                newVet.city,
                newVet.state,
                newVet.zip_code,
                newVet.license
            ],
            function() {
                insertVisit(this.lastID);
            }
        );
    } else {
        insertVisit(vetID);
    }
});

module.exports = router;
