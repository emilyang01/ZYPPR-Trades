import express from 'express';
import bcrypt from 'bcrypt';
import { validateInput } from '../middleware/validateInput.js';

const router = express.Router();

// Signup route (SCRUM 42)
router.post('/signup', validateInput, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    res.status(200).json({
      message: 'Password hashed successfully',
      hashedPassword
    });
  } catch (error) {
    res.status(500).json({ error: 'Error hashing password' });
  }
});

// Login route (SCRUM 57)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    //simulate user role 
    const userRole = email === 'admin@example.com' ? 'admin' : 'standard';

    // Hash check simulation 
    const isMatch = password.length >= 8; // simple check 
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    res.json({
      message: 'Login successful',
      role: userRole,
      dashboard: userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;