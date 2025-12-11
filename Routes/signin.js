const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

//allows form parsing
router.use(express.urlencoded({ extended: true }));

//Used for testing if the route is working
console.log("Signin.js is being used!")

//Allows use of the database
const db = new sqlite3.Database("./Animals.db");

// Handle form POST and insert into database
// Gathers user inputed data from index.html's signup form
router.post("/signup", (req, res) => {
    const {txtSignUpEmail, txtSignUpPassword, txtFirstName, txtLastName,
            txtTelephone, txtAddress, txtCity, txtState, txtZip, txtRole,
            locationID} = req.body;
    
    //gets any rows with given email if email exists gives user an error
    db.get(`SELECT * FROM tblUsers WHERE email = ?`, [txtSignUpEmail], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send("Server error");
        }

        if (row) {
            // Email already exists
            return res.status(400).json({ error: "Email already in use" });
        }
    });

   // Takes that data and runs a sql command to insert data into usertable
    db.run(`INSERT INTO tblUsers (email, password) VALUES (?, ?)`, [txtSignUpEmail, txtSignUpPassword], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error saving data.");
        } else {
            console.log(`A row has been inserted into tblusers with rowid ${this.lastID}`);
        }
    });

    const newUserID = this.lastID; //userID from tblUsers for the link

   // Takes that data and runs a sql command to insert data into employee table
    db.run(`INSERT INTO tblEmployee (fname, lname, role, phone, street, city, state, zipcode, locationID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [txtFirstName, txtLastName, txtRole, txtTelephone, txtAddress, txtCity, txtState, txtZip, locationID], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error saving data.");
        } else {
            console.log(`A row has been inserted into tblemployees with rowid ${this.lastID}`);
        } 
        return res.json({ userid: this.lastID });
    });
});

//Exports Router
module.exports = router; 
