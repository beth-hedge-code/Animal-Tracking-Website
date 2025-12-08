//This Page starts the server and hosts all routes for webpages

const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const HTTP_PORT = 8000
const path = require("path");

const app = express()

app.use(express.json());

// allow form data
app.use(express.urlencoded({ extended: true }));

//tells user what port its being ran on
app.listen(HTTP_PORT, () => {
    console.log('Listening on port ', HTTP_PORT)
})

// DEFAULT PAGE
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


// ROUTES Defined and used
const loginRoutes = require("./Routes/login");
const signinRoutes = require("./Routes/signin");
const animalfactRoutes = require("./Routes/animalfact");
const vetRoutes = require("./Routes/vetroute");
const animalTableRoutes = require("./Routes/animaltableroute");

// serve static files (CSS, JS, HTML) inside directory
app.use(express.static(__dirname));

app.use("/", loginRoutes);
app.use("/", signinRoutes);
app.use("/", animalfactRoutes);
app.use("/", vetRoutes);
app.use("/", animalTableRoutes);


