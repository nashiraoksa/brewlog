/*
  Warnings:

  - Changed the type of `type` on the `Filter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `material` on the `Filter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Filter" DROP COLUMN "type",
ADD COLUMN     "type" "FilterType" NOT NULL,
DROP COLUMN "material",
ADD COLUMN     "material" "FilterMaterial" NOT NULL;
