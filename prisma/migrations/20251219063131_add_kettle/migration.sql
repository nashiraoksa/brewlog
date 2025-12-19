-- CreateEnum
CREATE TYPE "KettleType" AS ENUM ('ELECTRIC', 'STOVETOP');

-- CreateTable
CREATE TABLE "Kettle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "KettleType" NOT NULL,
    "purchase_date" TIMESTAMP(3),
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Kettle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Kettle" ADD CONSTRAINT "Kettle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
