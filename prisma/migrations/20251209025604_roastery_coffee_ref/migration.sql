-- AddForeignKey
ALTER TABLE "Coffee" ADD CONSTRAINT "Coffee_roastery_fkey" FOREIGN KEY ("roastery") REFERENCES "Roastery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
