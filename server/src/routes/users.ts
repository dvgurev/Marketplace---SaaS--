import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// get current user
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).end();
  const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
  res.json(user);
});

// list all users (admin only)
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const users = await prisma.user.findMany();
  res.json(users);
});

// update profile
router.put('/', authenticate, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).end();
  const { firstName, lastName, companyName, phone } = req.body;
  const user = await prisma.user.update({
    where: { id: req.user.userId },
    data: { firstName, lastName, companyName, phone },
  });
  res.json(user);
});

export default router;
