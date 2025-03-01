const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const router = express.Router();

// Signup Route (POST Request)
router.post("/signup", async (req, res) => {
  try {
    console.log("🔹 Signup route hit!");
    console.log("🔹 Request body:", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ error: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists");
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed");

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    console.log("✅ User saved to database");
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.log("❌ Signup error:", error);
    res.status(500).json({ error: "Error signing up!" });
  }
});

// Signin Route (POST Request)
router.post("/signin", async (req, res) => {
  try {
    console.log("🔹 Signin route hit!");
    console.log("🔹 Request body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ error: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ error: "Invalid credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password");
      return res.status(400).json({ error: "Invalid credentials!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ Signin successful");
    res.status(200).json({ message: "Signin successful!", token });

  } catch (error) {
    console.log("❌ Signin error:", error);
    res.status(500).json({ error: "Error signing in!" });
  }
});

module.exports = router;
