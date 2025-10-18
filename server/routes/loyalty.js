import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get user's loyalty points
router.get('/points/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ loyaltyPoints: user.loyaltyPoints || 0 });
  } catch (error) {
    console.error('Get loyalty points error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add loyalty points (called after order completion)
router.post('/add-points', async (req, res) => {
  try {
    const { email, points } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.loyaltyPoints = (user.loyaltyPoints || 0) + points;
    await user.save();

    res.json({ 
      message: 'Points added successfully',
      loyaltyPoints: user.loyaltyPoints 
    });
  } catch (error) {
    console.error('Add loyalty points error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Redeem loyalty points
router.post('/redeem-points', async (req, res) => {
  try {
    const { email, points } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.loyaltyPoints < points) {
      return res.status(400).json({ message: 'Insufficient loyalty points' });
    }

    user.loyaltyPoints -= points;
    await user.save();

    res.json({ 
      message: 'Points redeemed successfully',
      loyaltyPoints: user.loyaltyPoints 
    });
  } catch (error) {
    console.error('Redeem loyalty points error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
