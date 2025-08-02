-- AlterTable
ALTER TABLE "public"."Problem" ADD COLUMN     "testId" INTEGER;

-- CreateTable
CREATE TABLE "public"."Test" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "password" TEXT NOT NULL,
    "hasStarted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Test_slug_key" ON "public"."Test"("slug");

-- AddForeignKey
ALTER TABLE "public"."Problem" ADD CONSTRAINT "Problem_testId_fkey" FOREIGN KEY ("testId") REFERENCES "public"."Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;
