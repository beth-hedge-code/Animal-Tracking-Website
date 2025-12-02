const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const HTTP_PORT = 8000
const users = require('./Routes/login')

const app = express()

// allow form data
app.use(express.urlencoded({ extended: true }));

// serve static files (CSS, JS, HTML)
app.use(express.static(__dirname));

// ROUTES
const loginRoutes = require("./Routes/login");
app.use("/", loginRoutes);   // <-- THIS ATTACHES /submit

app.listen(HTTP_PORT, () => {
    console.log('Listening on port ', HTTP_PORT)
})

// DEFAULT PAGE
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

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

app.listen(HTTP_PORT, () => {
    console.log(`Server running at http://localhost:${HTTP_PORT}`);
});
