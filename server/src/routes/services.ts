import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// public: list active services
router.get('/', async (req: Request, res: Response) => {
  const services = await prisma.service.findMany({ where: { isActive: true } });
  res.json(services);
});

// admin CRUD
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { name, slug, description, dockerImage } = req.body;
  try {
    const service = await prisma.service.create({
      data: { name, slug, description, dockerImage },
    });
    res.status(201).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { id } = req.params;
  const data = req.body;
  try {
    const service = await prisma.service.update({ where: { id }, data });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { id } = req.params;
  try {
    await prisma.service.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
