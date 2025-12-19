-- CreateEnum
CREATE TYPE "FilterType" AS ENUM ('CONE', 'FLATCONE', 'DISK', 'WAVY', 'BASKET', 'SACK', 'OTHER');

-- CreateEnum
CREATE TYPE "FilterMaterial" AS ENUM ('PAPER', 'UNBLEACHEDPAPER', 'CLOTH', 'PLASTIC', 'METAL', 'OTHER');

-- CreateTable
CREATE TABLE "Filter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DripperType" NOT NULL,
    "material" "DripperMaterial" NOT NULL,
    "purchase_date" TIMESTAMP(3),
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Filter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Filter" ADD CONSTRAINT "Filter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
