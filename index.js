const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const HTTP_PORT = 8000
const path = require("path");


const app = express()

// allow form data
app.use(express.urlencoded({ extended: true }));

app.listen(HTTP_PORT, () => {
    console.log('Listening on port ', HTTP_PORT)
})

// DEFAULT PAGE
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


// ROUTES
const loginRoutes = require("./Routes/login");
const signinRoutes = require("./Routes/signin");
const animalfactRoutes = require("./Routes/animalfact");
const vetRoutes = require("./Routes/vetroute");
app.use("/", loginRoutes);
app.use("/", signinRoutes);
app.use("/", animalfactRoutes);
app.use("/", vetRoutes);

// serve static files (CSS, JS, HTML)
app.use(express.static(__dirname));
