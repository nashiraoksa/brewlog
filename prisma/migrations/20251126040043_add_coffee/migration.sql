-- CreateEnum
CREATE TYPE "RoastLevel" AS ENUM ('LIGHT', 'MEDIUM', 'MEDIUM_DARK', 'DARK');

-- CreateTable
CREATE TABLE "Coffee" (
    "id" TEXT NOT NULL,
    "roastery" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roast_level" "RoastLevel" NOT NULL,
    "roast_date" TIMESTAMP(3),
    "weight" INTEGER NOT NULL,
    "price" INTEGER,
    "flavor_profile" TEXT[],

    CONSTRAINT "Coffee_pkey" PRIMARY KEY ("id")
);
