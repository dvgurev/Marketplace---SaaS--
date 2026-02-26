import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router({ mergeParams: true });

// list plans for a given service (public)
router.get('/', async (req: Request, res: Response) => {
  const { serviceId } = req.params as any;
  const plans = await prisma.servicePlan.findMany({ where: { serviceId, isActive: true } });
  res.json(plans);
});

// admin CRUD for plans
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { serviceId } = req.params as any;
  const data = { ...req.body, serviceId };
  try {
    const plan = await prisma.servicePlan.create({ data });
    res.status(201).json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  try {
    const plan = await prisma.servicePlan.update({ where: { id: req.params.id }, data: req.body });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  try {
    await prisma.servicePlan.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
