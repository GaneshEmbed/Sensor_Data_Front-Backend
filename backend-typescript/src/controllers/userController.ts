// Importing necessary modules for handling requests, responses, and JWT token management
import { Request, Response } from 'express';  // Importing Request and Response types from Express
import jwt from 'jsonwebtoken';               // Importing jsonwebtoken to verify and decode JWT tokens

import { UserModel } from '../models/User';   // Importing the UserModel for interacting with user data in the database
import { JWT_SECRET } from '../config';       // Importing JWT secret key from the config file

// Get User Details: Retrieves the current user's details based on the JWT token
export const getMe = async (req: Request, res: Response): Promise<void> => {  
  // Extracting the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];                    

  // Checking if token exists
  if (!token) {
    res.status(401).json({ error: 'No token provided' });  // Sending error response if token is missing
    return;                                                // Exiting the function early if no token is provided
  }

  try {
    // Verifying and decoding the JWT token to extract the user ID
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };  
    // Finding the user by ID and excluding the password field from the result
    const user = await UserModel.findById(decoded.id).select('-password');
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });  // Sending error response if user is not found
      return;                                             // Exiting the function early if user is not found
    }

    // Sending the user details in the response
    res.json(user);                                    
  } catch (error) {
    console.error('Token Error:', error);              // Logging the error if token verification fails
    res.status(401).json({ error: 'Invalid token' });  // Sending error response if token is invalid
  }
};

// Update User Details: Allows updating user details based on the JWT token
export const updateUser = async (req: Request, res: Response): Promise<void> => {  
  const token = req.headers.authorization?.split(' ')[1];  // Extracting the token from the Authorization header

  // Checking if token exists
  if (!token) {
    res.status(401).json({ error: 'No token provided' });  // Sending error response if token is missing
    return;                                                // Exiting the function early if no token is provided
  }

  try {
    // Verifying and decoding the JWT token to extract the user ID
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };  
    // Finding the user by ID in the database
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });  // Sending error response if user is not found
      return;                                             // Exiting the function early if user is not found
    }

    // Updating the user with the new data from the request body
    Object.assign(user, req.body);  // Merging the request body data into the user document
    await user.save();              // Saving the updated user document in the database

    // Sending success response after update
    res.status(200).json({ message: 'User updated successfully' });  
  } catch (error) {
    console.error('Update Error:', error);                           // Logging the error if any exception occurs
    res.status(500).json({ error: 'Update failed' });                // Sending error response if update fails
  }
};
