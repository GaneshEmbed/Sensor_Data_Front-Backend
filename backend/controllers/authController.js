const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config');

// Register controller
exports.register = async (req, res) => {
    const {
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      mobileNumber,
      address,
      country,
      state,
      city,
      zipCode,
      companyName,
      companyAddress,
      gstNumber,
    } = req.body;
  
    // Check if required fields are provided
    if (
        !username || 
        !password || 
        !confirmPassword || 
        !firstName || 
        !lastName || 
        !mobileNumber || 
        !address || 
        !country || 
        !state || 
        !city || 
        !zipCode
    ) {
      return res.status(400).json({ error: 'Fill in the required details' });
    }
  
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Password does not match' });
    }
  
    try {
      // Check if username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user object
      const user = new User({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        mobileNumber,
        address,
        country,
        state,
        city,
        zipCode,
        companyName,
        companyAddress,
        gstNumber,
      });
  
      // Save the new user to the database
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Error registering user' });
    }
  };
  
  // Login controller
  exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
  
      // Generate access token and refresh token
      const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  
      // Send the tokens back in the response
      res.json({ accessToken, refreshToken });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Error logging in' });
    }
  };

// Refresh Token controller
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ accessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
};
