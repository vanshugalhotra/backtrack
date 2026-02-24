import { PrismaClient, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

// --- 1. DEFINE DATA FOR TEST TABLE ---
const testData = [
  {
    id: 5,
    name: 'Sample Test',
    slug: 'sample-test',
    description:
      'This is a sample test just to introduce you with the interface. Password: sample',
    password: 'sample',
    hasStarted: false,
  },
  {
    id: 6,
    name: 'BackTrack into the Void',
    slug: 'backtrack-void',
    description:
      'A steady stream of problems that push your thinking to the limit.',
    password: 'Version26@UST',
    hasStarted: false,
  },
];

// --- 2. DEFINE DATA FOR PROBLEMS TABLE ---
const problemData = [
  {
    id: 3,
    name: 'Cosmic Echo',
    slug: 'cosmic-echo',
    difficulty: Difficulty.EASY, // Use the enum
    points: 20,
    exePath: 'look_and_say.out',
    description: '1 <= n <= 1e9',
    iconPath: 'cosmic_echo.svg',
  },
  {
    id: 4,
    name: 'Photon Drift',
    slug: 'photon-drift',
    difficulty: Difficulty.MEDIUM,
    points: 30,
    exePath: 'ascii_encoder.out',
    description: 'string of length 1 to 1000 | Hint: Play with ASCII',
    iconPath: 'photo_drift.svg',
  },
  {
    id: 5,
    name: 'Cosmic Diagonals',
    slug: 'cosmic-diagonals',
    difficulty: Difficulty.MEDIUM,
    points: 30,
    exePath: 'pattern.out',
    description: '1 <= n <= 100',
    iconPath: 'cosmic-diagonals.png',
  },
  {
    id: 6,
    name: 'Event Horizon',
    slug: 'event-horizon',
    difficulty: Difficulty.MEDIUM,
    points: 30,
    exePath: 'nearest_prime.out',
    description: '1 <= n <= 1e5',
    iconPath: 'supernova.png',
  },
  {
    id: 7,
    name: "Halley's Orbit",
    slug: 'halleys-orbit',
    difficulty: Difficulty.MEDIUM,
    points: 30,
    exePath: 'rotate_number.out',
    description: '1 <= n <= 1e9 | Hint: Think in Binary !',
    iconPath: 'galaxy.png',
  },
  {
    id: 8,
    name: 'Quasar Spiral',
    slug: 'quasar-spiral',
    difficulty: Difficulty.HARD,
    points: 50,
    exePath: 'fib_mask.out',
    description: '1 <= n <= 1e5',
    iconPath: 'spiral.png',
  },
  {
    id: 9,
    name: 'Quantum Star',
    slug: 'quantum-star',
    difficulty: Difficulty.EASY,
    points: 20,
    exePath: 'sample.out',
    description: '1 <= n <= 1e9',
    iconPath: 'neutron.png',
  },
];

// --- 3. DEFINE RELATIONSHIP DATA ---
// Column A = Test ID, Column B = Problem ID (from image_669968.png)
// We only need to know which problems belong to which tests.
const testProblemRelations = [
  { testId: 6, problemId: 3 },
  { testId: 6, problemId: 4 },
  { testId: 6, problemId: 5 },
  { testId: 6, problemId: 6 },
  { testId: 6, problemId: 7 },
  { testId: 6, problemId: 8 },
  { testId: 5, problemId: 9 },
];

async function main() {
  console.log('Start seeding...');

  // --- Seed Problems first (since Tests will reference them) ---
  for (const problem of problemData) {
    await prisma.problem.upsert({
      where: { id: problem.id },
      update: { ...problem },
      create: { ...problem },
    });
    console.log(`Upserted Problem: ${problem.name}`);
  }

  // --- Seed Tests ---
  for (const test of testData) {
    await prisma.test.upsert({
      where: { id: test.id },
      update: { ...test },
      create: { ...test },
    });
    console.log(`Upserted Test: ${test.name}`);
  }

  // --- Seed Relationships (TestProblems) ---
  // The goal is to attach problems to the tests they belong to.
  for (const relation of testProblemRelations) {
    // Find the problems that belong to the current Test ID
    const problemsToConnect = testProblemRelations
      .filter((r) => r.testId === relation.testId)
      .map((r) => ({ id: r.problemId }));

    // Update the Test record to connect all its problems
    try {
      await prisma.test.update({
        where: { id: relation.testId },
        data: {
          problems: {
            // Connect all problems associated with this test.
            connect: problemsToConnect,
          },
        },
      });
    } catch (e) {
      // Catch errors for relations that might already exist
      // Or if a Test ID or Problem ID is missing.
      const errorMessage = e instanceof Error ? e.message : String(e);
      console.error(
        `Error connecting problems for Test ID ${relation.testId}: ${errorMessage}`,
      );
    }
    console.log(`Connected problems to Test ID: ${relation.testId}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('An error occurred during seeding:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
