const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

//allows form parsing
router.use(express.urlencoded({ extended: true }));

//Used for testing if the route is working
console.log("Login.js Works!")

//Allows use of the database
const db = new sqlite3.Database("./Animals.db");

router.post("/login", (req, res) => {
    const { txtLoginEmail, txtLoginPassword } = req.body;

    const sql = `SELECT userID, email, password FROM tblUsers WHERE email = ?`;

    db.get(sql, [txtLoginEmail], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Server error." });
        }

        if (!row) {
            return res.status(400).json({ error: "Email not found." });
        }

        if (row.password !== txtLoginPassword) {
            return res.status(400).json({ error: "Incorrect password." });
        }

        // Successful login
        res.json({ userid: row.userid });
    });
});


//Exports Router
module.exports = router; 



