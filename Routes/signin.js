const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

//allows form parsing
router.use(express.urlencoded({ extended: true }));

console.log("Signin.js is being used!")

const db = new sqlite3.Database("./Animals.db");


// Handle form POST and insert into database
router.post("/submit", (req, res) => {
    const {txtLoginEmail, txtLoginPassword } = req.body;

    db.run(`INSERT INTO tblUsers (email, password) VALUES (?, ?)`, [txtLoginEmail, txtLoginPassword], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error saving data.");
        } else {
            console.log(`A row has been inserted into tblusers with rowid ${this.lastID}`);
        }
    });
    
    db.run(`INSERT INTO tblEmployee (fname, lname, role, phone, street, city, state, zipcode, locationID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error saving data.");
        } else {
            console.log(`A row has been inserted into tblemployees with rowid ${this.lastID}`);
        } 
    });
});