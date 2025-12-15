/*
  Warnings:

  - Added the required column `userId` to the `Roastery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roastery" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Roastery" ADD CONSTRAINT "Roastery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
