import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.problem.createMany({
    data: [
      {
        name: 'Cosmic Diagonals',
        slug: 'cosmic-diagonals',
        difficulty: 'MEDIUM',
        points: 30,
        exePath: 'cosmic.exe',
        description: '1 <= n <= 1000',
        iconPath: 'cosmic-diagonals.png',
      },
    ],
  });

  console.log('✅ Seed data inserted');
}

main()
  .catch((e: unknown) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect(); // or await it if using top-level await
  });
