const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
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

app.listen(3000, () => {
    console.log("C Runner available at http://localhost:3000");
});
