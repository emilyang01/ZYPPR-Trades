import express from 'express';
import bcrypt from 'bcrypt';
import { validateInput } from '../middleware/validateInput.js';

const router = express.Router();

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

export default router;