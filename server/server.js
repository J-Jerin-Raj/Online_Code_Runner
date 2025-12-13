const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const connectDB = require("./db");

const app = express();


// connectDB();

app.use(express.json());
app.use(express.static("public"));

app.post("/run", (req, res) => {
  const code = req.body.code;

  fs.writeFileSync("program.c", code);

  exec("gcc program.c -o program.out && ./program.out", (err, stdout, stderr) => {
    if (err) return res.send(stderr);
    res.send(stdout);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});