-- CreateEnum
CREATE TYPE "GrinderType" AS ENUM ('MANUAL', 'AUTOMATIC');

-- CreateTable
CREATE TABLE "Grinder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "GrinderType" NOT NULL,
    "details" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Grinder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Grinder" ADD CONSTRAINT "Grinder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
