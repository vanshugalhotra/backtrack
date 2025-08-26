import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.problem.createMany({
    data: [
      {
        name: 'Cosmic Diagonals',
        slug: 'cosmic-diagonals',
        difficulty: 'MEDIUM',
        points: 10,
        exePath: 'executables/hello-world.exe',
        description: 'Print "Hello, World!" to the console.',
        iconPath: 'icons/hello-world.png',
      },
      {
        name: 'Sum of Two Numbers',
        slug: 'sum-of-two',
        difficulty: 'EASY',
        points: 20,
        exePath: 'executables/sum-of-two.exe',
        description: 'Read two integers and print their sum.',
        iconPath: 'icons/sum-of-two.png',
      },
      {
        name: 'Matrix Rotation',
        slug: 'matrix-rotation',
        difficulty: 'HARD',
        points: 50,
        exePath: 'executables/matrix-rotation.exe',
        description: 'Rotate a matrix 90 degrees clockwise.',
        iconPath: 'icons/matrix-rotation.png',
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
