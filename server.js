const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5500; // ✅ ONLY 5500 (NO 3000 ANYWHERE)

/* ---------------- DEBUG (VERY IMPORTANT) ---------------- */
console.log("🔥 RUNNING SERVER FILE FROM:", __dirname);
console.log("🔥 PORT VALUE IS:", PORT);

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serves index.html

/* ---------------- HEALTH CHECK ---------------- */
app.get("/health", (req, res) => {
    res.send("✅ Server is alive on port 5500");
});

/* ---------------- RUN C CODE ---------------- */
app.post("/run", (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).send("No code provided");
    }

    fs.writeFileSync("program.c", code);

    const command =
        process.platform === "win32"
            ? "gcc program.c -o program.exe && program.exe"
            : "gcc program.c -o program && ./program";

    exec(command, { timeout: 5000 }, (err, stdout, stderr) => {
        if (err) {
            return res.send(stderr || err.message);
        }
        res.send(stdout || "Program executed with no output");
    });
});

/* ---------------- NODEMAILER ---------------- */
/*
STEPS REQUIRED:
1. Enable 2-Step Verification on Gmail
2. Create App Password (Mail → Windows)
3. Paste it below (NO SPACES)
*/
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "abishekjoseph9b@gmail.com",
        pass: "jqhfytzbvkgkwtzl"
    }
});


// Verify SMTP at startup
transporter.verify((err) => {
    if (err) {
        console.error("❌ SMTP ERROR:", err.message);
    } else {
        console.log("✅ Mail server ready");
    }
});

/* ---------------- INVITE ROUTE ---------------- */
app.post("/invite", async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send("Name and email are required");
    }

    try {
        await transporter.sendMail({
            from: `"iSwiftCoder" <abishekjoseph9b@gmail.com>`,
            to: email, // ✅ ANY DOMAIN WORKS
            subject: "You're invited to iSwiftCoder 🚀",
            html: `
                <h2>Hello ${name},</h2>
                <p>You have been invited to collaborate on <b>iSwiftCoder</b>.</p>
                <p>
                    <a href="http://localhost:${PORT}"
                       style="padding:10px 16px;
                              background:#0e639c;
                              color:white;
                              text-decoration:none;
                              border-radius:6px;">
                        Join iSwiftCoder
                    </a>
                </p>
                <p>Happy coding 👨‍💻👩‍💻</p>
            `
        });

        console.log(`📨 Invite sent to ${email}`);
        res.send(`Invitation sent to ${name}`);

    } catch (err) {
        console.error("❌ EMAIL ERROR:", err.message);
        res.status(500).send("Failed to send invitation email");
    }
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
    