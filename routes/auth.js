const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});


router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await User.create({
      email,
      password: hashedPassword,
      otp,
      otpExpires: new Date(Date.now() + 5 * 60 * 1000) 
    });

    
    console.log(`OTP for ${email}: ${otp}`);

   
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER || "your-email@gmail.com",
        to: email,
        subject: "Your OTP for Registration",
        html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 30px;">
    <div style="max-width: 500px; margin: auto; background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      
      <h2 style="color: #333333; text-align: center;">
        Email Verification
      </h2>

      <p style="color: #555555; font-size: 15px;">
        Hello,
      </p>

      <p style="color: #555555; font-size: 15px;">
        Thank you for registering. Please use the OTP below to verify your email address.
      </p>

      <div style="text-align: center; margin: 25px 0;">
        <span style="display: inline-block; font-size: 24px; letter-spacing: 4px; color: #ffffff; background-color: #4f46e5; padding: 12px 20px; border-radius: 6px;">
          ${otp}
        </span>
      </div>

      <p style="color: #555555; font-size: 14px;">
        <strong>Instructions:</strong>
      </p>

      <ul style="color: #555555; font-size: 14px; padding-left: 18px;">
        <li>This OTP is valid for <strong>5 minutes</strong>.</li>
        <li>Do not share this OTP with anyone.</li>
        <li>If you did not request this, please ignore this email.</li>
      </ul>

      <p style="color: #555555; font-size: 14px; margin-top: 20px;">
        Regards,<br>
        <strong>Online Code Runner Team</strong>
      </p>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">

      <p style="color: #888888; font-size: 12px; text-align: center;">
        This is an automated email. Please do not reply.
      </p>

    </div>
  </div>
`

      });
    } catch (emailError) {
      console.log("Email sending failed, but OTP created:", emailError.message);
    }

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});


router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP expired. Please register again" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: "OTP verified successfully. You can now login" });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: "Server error during OTP verification" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify OTP first. Go to register page" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ 
      message: "Login successful",
      user: {
        email: user.email,
        id: user._id
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
