import request from 'supertest';
import app from '../app';
import prisma from '../prisma';

// we need to export express app from index.ts to allow testing

describe('Auth API', () => {
  beforeAll(async () => {
    // ensure database is clean or use test db
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('register and login', async () => {
    const email = `test${Date.now()}@example.com`;
    const password = 'password123';

    const res1 = await request(app).post('/api/auth/register').send({ email, password });
    expect(res1.status).toBe(200);
    expect(res1.body.token).toBeDefined();

    const res2 = await request(app).post('/api/auth/login').send({ email, password });
    expect(res2.status).toBe(200);
    expect(res2.body.token).toBeDefined();
  });
});
