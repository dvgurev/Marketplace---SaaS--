import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// user list own tenants
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).end();
  const tenants = await prisma.tenant.findMany({ where: { userId: req.user.userId } });
  res.json(tenants);
});

// admin list all
router.get('/all', authenticate, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const tenants = await prisma.tenant.findMany();
  res.json(tenants);
});

export default router;
