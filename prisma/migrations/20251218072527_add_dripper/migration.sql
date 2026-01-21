-- CreateEnum
CREATE TYPE "DripperType" AS ENUM ('CONE', 'FLATBOTTOM', 'WEDGE', 'BASKET', 'NOBYPASS', 'IMMERSION', 'OTHER');

-- CreateEnum
CREATE TYPE "DripperMaterial" AS ENUM ('CERAMIC', 'GLASS', 'PLASTIC', 'STAINLESS', 'COPPER', 'WOOD', 'OTHER');

-- CreateTable
CREATE TABLE "Dripper" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DripperType" NOT NULL,
    "material" "DripperMaterial" NOT NULL,
    "purchase_date" TIMESTAMP(3),
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Dripper_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dripper" ADD CONSTRAINT "Dripper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
