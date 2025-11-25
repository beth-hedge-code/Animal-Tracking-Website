const sqlite3 = require("sqlite3").verbose();

// Open (or create) the database
const db = new sqlite3.Database("./trees.db");

// Create table and insert test data
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tbltrees (
    TreeID INTEGER PRIMARY KEY,
    Name TEXT,
    Species TEXT
  )`);

  const stmt = db.prepare("INSERT INTO tbltrees (Name, Species) VALUES (?, ?)");

  stmt.run("Oak", "Quercus");
  stmt.run("Pine", "Pinus");
  stmt.run("Maple", "Acer");

  stmt.finalize();

  console.log("Test database created with sample data.");
});

db.close();
