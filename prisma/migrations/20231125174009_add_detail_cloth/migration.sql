-- CreateEnum
CREATE TYPE "ClothType" AS ENUM ('TOP', 'BOTTOM');

-- CreateTable
CREATE TABLE "DetailClothes" (
    "id" TEXT NOT NULL,
    "bust" DOUBLE PRECISION,
    "waist" DOUBLE PRECISION,
    "hips" DOUBLE PRECISION,
    "length" DOUBLE PRECISION,
    "sleeve_length" DOUBLE PRECISION,
    "cloth_type" "ClothType" NOT NULL DEFAULT 'TOP',
    "cloth_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DetailClothes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DetailClothes_cloth_id_key" ON "DetailClothes"("cloth_id");

-- AddForeignKey
ALTER TABLE "DetailClothes" ADD CONSTRAINT "DetailClothes_cloth_id_fkey" FOREIGN KEY ("cloth_id") REFERENCES "Clothes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
