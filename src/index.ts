import express = require('express');
import path = require('path');
import fs = require('fs');
import { exec } from 'child_process';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// __dirname works normally in CommonJS
const distPath = path.join(__dirname, '../dist');

// Serve static files
app.use(express.static(distPath));

// Redirect root to login.html
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// -------------------------------
// C CODE RUNNER ENDPOINT
// -------------------------------
app.post('/run', (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send('No C code provided');
    }

    const cFile = path.join(__dirname, 'program.c');
    const outFile = path.join(__dirname, 'program.out');

    fs.writeFileSync(cFile, code);

    exec(`gcc "${cFile}" -o "${outFile}" && "${outFile}"`, (err, stdout, stderr) => {
        if (err) {
            return res.send(stderr || err.message);
        }
        res.send(stdout);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
