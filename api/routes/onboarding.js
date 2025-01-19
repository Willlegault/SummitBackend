const express = require('express');
const UserModel = require('../models/UserSchema');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get('/', (req, res) => {
  res.json('Hello World');
});

router.post('/initUser', async (req, res) => {
  const { firstName, lastName, email, income, totalDebt, location } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email }); // Check if a user with the given email already exists.
    if (existingUser) {
      return res
      .status(409)
      .json({ error: 'User with this email already exists' }); // Return a conflict error if the email is already in use.
    }
    
    const newUser = await UserModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      debt: totalDebt,
      income: income,
      location: location
    });
    return res.status(201).json({ message: 'User registered successfully', data: newUser });
  }
  catch (error) {
    console.error('Registration error:', error); // Log any errors.
    return res.status(500).json({ error: 'Internal server error' }); // Return a server error response.
  }
});

router.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    console.log('Email:', email);
    const userDoc = await UserModel.findOne({ email});
    if (!userDoc) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(userDoc);
  } catch (error) {
    console.login('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/profile', (req, res) => {
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => { // Verify the token.
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' }); // Return unauthorized if token verification fails.
      }
      const { name, email, _id } = await User.findById(userData.id); // Fetch user details using the token payload.
      res.json({
        name,
        email,
        _id,
      }); // Return the user profile data.
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' }); // Return unauthorized if no token is provided.
  }
});

module.exports = router;
