const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

//allows form parsing
router.use(express.urlencoded({ extended: true }));

console.log("Login.js Works!")

const db = new sqlite3.Database("./Animals.db");

// Create table if it doesn't exist
/* db.run(`
    CREATE TABLE IF NOT EXISTS tblUsers (
        userid INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )
`);
 */

// Handle form POST and insert into database
router.post("/submit", (req, res) => {
    const {txtLoginEmail, txtLoginPassword } = req.body;

    db.run(`INSERT INTO tblUsers (email, password) VALUES (?, ?)`, [txtLoginEmail, txtLoginPassword], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error saving data.");
        } else {
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            //res.send(`<h2>Thank you,! Your message was saved.</h2>
                      //<a href="/">Go back</a>`);
            return res.redirect('./animalhome.html')
        }
    });
});

module.exports = router;



/* //db.run(sql,params,callback)
db.run('INSERT INTO tblUsers(userid, email, password, employeeid) VALUES(?,?,?,?)',[1,'farmer1','Password1',1],function (err) {
    if(err) {
        return console.log(err.message); 
    }
    console.log('Row was added to the table: ${userid}');
})  */