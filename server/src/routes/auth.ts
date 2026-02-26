import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../prisma';
import { hashPassword, comparePassword } from '../utils/hash';
import { signToken } from '../utils/jwt';

const router = Router();

// register
router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName } = req.body;
    try {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return res.status(409).json({ message: 'Email already used' });
      }
      const hash = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash: hash,
          firstName,
          lastName,
        },
      });
      const token = signToken({ userId: user.id, role: user.role });
      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// login
router.post(
  '/login',
  body('email').isEmail(),
  body('password').exists(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const valid = await comparePassword(password, user.passwordHash);
      if (!valid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = signToken({ userId: user.id, role: user.role });
      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
