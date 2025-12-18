-- CreateEnum
CREATE TYPE "EspressoMachineType" AS ENUM ('LEVER', 'AUTOMATIC');

-- CreateTable
CREATE TABLE "EspressoMachine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EspressoMachineType" NOT NULL,
    "purchase_date" TIMESTAMP(3),
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "EspressoMachine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EspressoMachine" ADD CONSTRAINT "EspressoMachine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
