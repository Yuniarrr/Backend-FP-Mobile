/*
  Warnings:

  - You are about to drop the column `bust` on the `DetailClothes` table. All the data in the column will be lost.
  - You are about to drop the column `cloth_type` on the `DetailClothes` table. All the data in the column will be lost.
  - You are about to drop the column `hips` on the `DetailClothes` table. All the data in the column will be lost.
  - You are about to drop the column `inseam` on the `DetailClothes` table. All the data in the column will be lost.
  - You are about to drop the column `length` on the `DetailClothes` table. All the data in the column will be lost.
  - You are about to drop the column `sleeve_length` on the `DetailClothes` table. All the data in the column will be lost.
  - You are about to drop the column `waist` on the `DetailClothes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DetailClothes" DROP COLUMN "bust",
DROP COLUMN "cloth_type",
DROP COLUMN "hips",
DROP COLUMN "inseam",
DROP COLUMN "length",
DROP COLUMN "sleeve_length",
DROP COLUMN "waist",
ADD COLUMN     "bust_top" DOUBLE PRECISION,
ADD COLUMN     "hips_bottom" DOUBLE PRECISION,
ADD COLUMN     "hips_top" DOUBLE PRECISION,
ADD COLUMN     "inseam_bottom" DOUBLE PRECISION,
ADD COLUMN     "length_bottom" DOUBLE PRECISION,
ADD COLUMN     "length_top" DOUBLE PRECISION,
ADD COLUMN     "sleeve_length_top" DOUBLE PRECISION,
ADD COLUMN     "waist_bottom" DOUBLE PRECISION,
ADD COLUMN     "waist_top" DOUBLE PRECISION;

-- DropEnum
DROP TYPE "ClothType";
