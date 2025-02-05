// Import necessary modules from Express
import { Router } from 'express'; // Importing Router to define API routes

// Import authentication-related controllers
import { register, login, refreshToken } from '../controllers/authController';

// Import user profile-related controllers
import { getMe, updateUser } from '../controllers/userController';

const router = Router(); // Create an instance of Router to define and manage API endpoints

/** 
 * Authentication Routes 
 * These routes handle user authentication-related actions.
 */
router.post('/register', register);     // Register a new user
router.post('/login', login);           // Authenticate a user and issue a token
router.post('/refresh', refreshToken);  // Refresh the access token

/** 
 * User Profile Routes 
 * These routes manage user profile retrieval and updates.
 */
router.get('/me', getMe);               // Fetch the current authenticated user's profile
router.put('/update', updateUser);      // Update the user profile

export default router; // Export the router for use in the main application
