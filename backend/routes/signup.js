import express from 'express';
import bcrypt from 'bcryptjs';
import { supabase } from '../supabase.js'; // Adjust the path if necessary

const router = express.Router();

// POST endpoint for user signup
router.post('/signup', async (req, res) => {
  try {
    // CHANGE THIS LINE: Destructure 'phonenumber' instead of 'phone'
    const { name, email, phonenumber, password, role } = req.body;

    // Basic validation
    // CHANGE THIS LINE: Use 'phonenumber' in the validation check
    if (!name || !email || !phonenumber || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Check for an existing user with the same email or phone number
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .or(`email.eq.${email},phonenumber.eq.${phonenumber}`); // Use 'phonenumber' here

    if (checkError) throw checkError;

    if (existingUser && existingUser.length > 0) {
      return res.status(409).json({ error: 'User with this email or phone number already exists' });
    }

    // Insert the new user into the 'users' table
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        { 
          role, 
          name, 
          email, 
          phonenumber, // Use the destructured 'phonenumber' variable
          password_hash,
        },
      ])
      .select('id, name, email, role');

    if (insertError) throw insertError;

    // Respond with the new user data
    res.status(201).json({ message: 'User created successfully', user: newUser[0] });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;