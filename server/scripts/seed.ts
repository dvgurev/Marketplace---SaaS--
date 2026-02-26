import prisma from '../src/prisma';
import { hashPassword } from '../src/utils/hash';

async function main() {
  const email = process.argv[2] || 'admin@example.com';
  const password = process.argv[3] || 'password';
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }
  const hash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash: hash, role: 'admin' },
  });
  console.log('Created admin', user.email);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
