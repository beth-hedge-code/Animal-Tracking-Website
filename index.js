const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

// Allow frontend to access files
app.use(express.static("."));

// Open DB
const db = new sqlite3.Database("./trees.db");

// API route
app.get("/tbltrees/:id", (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM tbltrees WHERE TreeID = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Tree not found" });

        res.json(row);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
