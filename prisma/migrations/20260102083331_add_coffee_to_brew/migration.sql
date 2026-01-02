-- AlterTable
ALTER TABLE "Brew" ADD COLUMN     "coffeeId" TEXT;

-- AddForeignKey
ALTER TABLE "Brew" ADD CONSTRAINT "Brew_coffeeId_fkey" FOREIGN KEY ("coffeeId") REFERENCES "Coffee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
