/*
  Warnings:

  - You are about to drop the column `testId` on the `Problem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Problem" DROP CONSTRAINT "Problem_testId_fkey";

-- AlterTable
ALTER TABLE "public"."Problem" DROP COLUMN "testId";

-- CreateTable
CREATE TABLE "public"."_TestProblems" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TestProblems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TestProblems_B_index" ON "public"."_TestProblems"("B");

-- AddForeignKey
ALTER TABLE "public"."_TestProblems" ADD CONSTRAINT "_TestProblems_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TestProblems" ADD CONSTRAINT "_TestProblems_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
