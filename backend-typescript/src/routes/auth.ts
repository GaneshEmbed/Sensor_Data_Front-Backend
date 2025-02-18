import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

// ✅ Load JWT Secret from Environment
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// ✅ TypeScript Interfaces
interface RegisterRequestBody {
  username: string;
  password: string;
}

interface LoginRequestBody {
  username: string;
  password: string;
}

// ✅ Health Check Route (API Test)
router.get('/test', (req: Request, res: Response): void => {
  res.json({ message: '✅ Auth Route Working' });
});

// ✅ Registration Route (Mock Implementation)
router.post('/register', (req: Request, res: Response): void => {
  const body = req.body as RegisterRequestBody;

  if (!body.username || !body.password) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }

  // In a real-world app, save the user to the database
  res.status(201).json({ message: `User ${body.username} registered successfully!` });
});

// ✅ Login Route (With JWT Token)
router.post('/login', (req: Request, res: Response): void => {
  const { username, password } = req.body as LoginRequestBody;

  // Simulated authentication check (Replace with DB validation)
  if (username === "testuser" && password === "pass123") {
    // Generate JWT Token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "User logged in successfully!", token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

export default router;
