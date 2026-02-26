import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// user views own subscriptions
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).end();
  const subs = await prisma.subscription.findMany({ where: { userId: req.user.userId } });
  res.json(subs);
});

// create subscription (user)
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).end();
  const { serviceId, planId, billingCycle } = req.body;
  try {
    const now = new Date();
    const periodEnd = new Date(now);
    if (billingCycle === 'yearly') {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    } else {
      periodEnd.setMonth(periodEnd.getMonth() + 1);
    }
    const sub = await prisma.subscription.create({
      data: {
        userId: req.user.userId,
        serviceId,
        planId,
        status: 'active',
        billingCycle,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
      },
    });
    res.status(201).json(sub);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// cancel subscription
router.post('/:id/cancel', authenticate, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).end();
  try {
    const sub = await prisma.subscription.update({
      where: { id: req.params.id },
      data: { cancelAtPeriodEnd: true, cancelledAt: new Date(), status: 'canceled' },
    });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// admin: list all
router.get('/all', authenticate, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const subs = await prisma.subscription.findMany();
  res.json(subs);
});

export default router;
