import express from "express";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phonenumber, role } = req.body;
    

    if (!name || !email || !password || !phonenumber || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into Supabase
    const { data, error } = await supabase.from("users").insert([
      {
        name,
        email,
        phonenumber,
        password_hash: hashedPassword,
        role,
      },

    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ message: "Database insert failed", error });
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
