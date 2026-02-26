import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// user payments
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).end();
  const payments = await prisma.payment.findMany({ where: { userId: req.user.userId } });
  res.json(payments);
});

// admin all payments
router.get('/all', authenticate, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const payments = await prisma.payment.findMany();
  res.json(payments);
});

export default router;
