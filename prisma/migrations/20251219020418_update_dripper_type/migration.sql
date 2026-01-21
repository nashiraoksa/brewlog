/*
  Warnings:

  - The values [BASKET] on the enum `DripperType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DripperType_new" AS ENUM ('CONE', 'FLATBOTTOM', 'WEDGE', 'NOBYPASS', 'IMMERSION', 'HYBRID', 'OTHER');
ALTER TABLE "Dripper" ALTER COLUMN "type" TYPE "DripperType_new" USING ("type"::text::"DripperType_new");
ALTER TYPE "DripperType" RENAME TO "DripperType_old";
ALTER TYPE "DripperType_new" RENAME TO "DripperType";
DROP TYPE "public"."DripperType_old";
COMMIT;
