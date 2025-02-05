// Importing necessary modules for handling requests, responses, and cryptography
import bcrypt from 'bcryptjs';                // Importing bcrypt for password hashing
import { Request, Response } from 'express';  // Importing Request and Response types from Express
import jwt from 'jsonwebtoken';               // Importing jsonwebtoken for handling JWT tokens

import { UserModel, IUser } from '../models/User';           // Importing the User model and IUser interface
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../config';  // Importing the JWT secrets from the config file

// Register Controller: Handles user registration
export const register = async (req: Request, res: Response): Promise<void> => {  // Register function as an async function
  const {
    username,          // Destructuring username from the request body
    password,          // Destructuring password from the request body
    confirmPassword,   // Destructuring confirmPassword from the request body
    firstName,         // Destructuring firstName from the request body
    lastName,          // Destructuring lastName from the request body
    mobileNumber,      // Destructuring mobileNumber from the request body
    address,           // Destructuring address from the request body
    country,           // Destructuring country from the request body
    state,             // Destructuring state from the request body
    city,              // Destructuring city from the request body
    zipCode,           // Destructuring zipCode from the request body
    companyName,       // Destructuring companyName from the request body
    companyAddress,    // Destructuring companyAddress from the request body
    gstNumber,         // Destructuring gstNumber from the request body
  } = req.body;        // Getting all data from the request body

  // Validating that all required fields are present in the request
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
    res.status(400).json({ error: 'Required fields are missing' });  // Sending error response if any required field is missing
    return;                                                          // Exiting the function early if validation fails
  };

  // Checking if password and confirmPassword match
  if (password !== confirmPassword) {
    res.status(400).json({ error: 'Passwords do not match' });  // Sending error response if passwords do not match
    return;                                                     // Exiting the function early if validation fails
  };

  try {
    // Checking if the username already exists in the database
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      res.status(400).json({ error: 'Username already exists' });  // Sending error response if username already exists
      return;                                                      // Exiting the function early if username is already taken
    };

    // Hashing the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);  // Hashing password using bcrypt with a salt of 10 rounds
    
    // Creating a new user document with the provided data
    const user: IUser = new UserModel({
      username,                  // Assigning username to the user model
      password: hashedPassword,  // Assigning hashed password to the user model
      firstName,                 // Assigning firstName to the user model
      lastName,                  // Assigning lastName to the user model
      mobileNumber,              // Assigning mobileNumber to the user model
      address,                   // Assigning address to the user model
      country,                   // Assigning country to the user model
      state,                     // Assigning state to the user model
      city,                      // Assigning city to the user model
      zipCode,                   // Assigning zipCode to the user model
      companyName,               // Assigning companyName to the user model
      companyAddress,            // Assigning companyAddress to the user model
      gstNumber,                 // Assigning gstNumber to the user model
    });

    // Saving the new user to the database
    await user.save();  // Saving the user document to MongoDB
    res.status(201).json({ message: 'User registered successfully' });  // Sending success response after registration
  } catch (error) {   
    console.error('Registration Error:', error);                        // Logging the error if any exception occurs
    res.status(500).json({ error: 'Registration failed' });             // Sending error response if there is an issue with registration
  };
};

// Login Controller: Handles user login and token generation
export const login = async (req: Request, res: Response): Promise<void> => {  // Login function as an async function
  const { username, password } = req.body;  // Extracting username and password from the request body

  try {
    // Finding user by username in the database
    const user = await UserModel.findOne({ username });
    if (!user) {
      res.status(404).json({ error: 'User not found' });  // Sending error response if user is not found
      return;                                             // Exiting the function early if user does not exist
    };

    // Comparing the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);  // Verifying password with bcrypt
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });       // Sending error response if password doesn't match
      return;                                                       // Exiting the function early if credentials are invalid
    };

    // Generating access and refresh tokens using JWT
    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });           // Access token with 1 hour expiration
    const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });  // Refresh token with 7 days expiration

    // Sending the generated tokens in the response
    res.json({ accessToken, refreshToken });          // Sending access and refresh tokens as JSON response
  } catch (error) {
    console.error('Login Error:', error);             // Logging the error if any exception occurs
    res.status(500).json({ error: 'Login failed' });  // Sending error response if there is an issue with login
  };
};

// Refresh Token Controller: Handles refresh token validation and access token generation
export const refreshToken = async (req: Request, res: Response): Promise<void> => {  // Refresh token function as an async function
  const { refreshToken } = req.body;  // Extracting the refresh token from the request body

  // Checking if refresh token is provided
  if (!refreshToken) {
    res.status(401).json({ error: 'Refresh token is required' });  // Sending error response if refresh token is missing
    return;  // Exiting the function early if refresh token is not provided
  };

  try {
    // Verifying the refresh token using JWT
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { id: string };  // Decoding refresh token to get user ID
    
    // Generating a new access token using the decoded user ID
    const accessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: '1h' });  // Access token with 1 hour expiration
    res.json({ accessToken });  // Sending the new access token in the response
  } catch (error) {
    console.error('Refresh Token Error:', error);              // Logging the error if any exception occurs
    res.status(403).json({ error: 'Invalid refresh token' });  // Sending error response if the refresh token is invalid
  };
};
