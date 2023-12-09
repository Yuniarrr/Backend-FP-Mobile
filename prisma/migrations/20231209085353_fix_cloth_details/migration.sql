-- DropIndex
DROP INDEX "DetailClothes_cloth_id_key";

-- AlterTable
ALTER TABLE "DetailClothes" ADD COLUMN     "inseam" DOUBLE PRECISION;
