const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

//allows form parsing
router.use(express.urlencoded({ extended: true }));

//Used for testing if the route is working
console.log("Login.js Works!")

//Allows use of the database
const db = new sqlite3.Database("./Animals.db");

// Handle form POST and insert into database
// Gathers user inputed data from index.html's login form
// Takes that data and runs a sql command to insert data into tables
router.post("/login", (req, res) => {
    const {txtLoginEmail, txtLoginPassword } = req.body;

    db.run(`INSERT INTO tblUsers (email, password) VALUES (?, ?)`, [txtLoginEmail, txtLoginPassword], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error saving data.");
        } else {
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
    });
    return res.redirect('./animalhome.html'); //Redirects to Animal Homepage
});

//Exports Router
module.exports = router; 



