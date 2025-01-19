const express = require('require');
const UserModel = require('../models/UserSchema');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.post('/initUser', async (req, res) => {
     const { firstName, lastName, email, income, totalDebt } = req.body;

     try {
        const existingUser = await User.findOne({ email }); // Check if a user with the given email already exists.
        if (existingUser) {
            return res
                .status(409)
                .json({ error: 'User with this email already exists' }); // Return a conflict error if the email is already in use.
    }
    res.status(201).json({ message: 'User registered successfully' }); 
}
});

router.get('/profile', (req, res) => {
    const { token } = req.cookies;
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