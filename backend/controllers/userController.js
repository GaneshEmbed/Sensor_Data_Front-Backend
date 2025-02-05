const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');

// Get user details
exports.getMe = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ---------------------------------------------------------------------------------------------------------------------------------------------

// Update user details
exports.updateUser = async (req, res) => {
  const {
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

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.mobileNumber = mobileNumber || user.mobileNumber;
    user.address = address || user.address;
    user.country = country || user.country;
    user.state = state || user.state;
    user.city = city || user.city;
    user.zipCode = zipCode || user.zipCode;
    user.companyName = companyName || user.companyName;
    user.companyAddress = companyAddress || user.companyAddress;
    user.gstNumber = gstNumber || user.gstNumber;

    await user.save();
    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Error updating user profile' });
  }
};


