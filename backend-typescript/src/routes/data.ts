import { Router, Request, Response } from 'express';

const router = Router();

router.get('/data', (req: Request, res: Response) => {
  res.json({ message: '✅ API is working', data: [] });
});

export default router;
