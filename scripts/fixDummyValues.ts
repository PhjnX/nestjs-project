// fixDummyValues.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.updateMany({
    where: { level: 'string' },
    data: { level: null },
  });

  await prisma.user.updateMany({
    where: { band: 'string' },
    data: { band: null },
  });

  console.log("✅ Fixed 'string' to NULL in level and band.");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
