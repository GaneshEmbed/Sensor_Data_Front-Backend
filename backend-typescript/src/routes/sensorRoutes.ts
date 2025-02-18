import { Router, Request, Response } from 'express';

const router = Router();

router.get('/status', (req: Request, res: Response) => {
  res.json({ message: '✅ Sensor Route Working' });
});

export default router;
