/*
  Warnings:

  - You are about to drop the column `image` on the `Tailors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tailors" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "TailorImage" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "tailor_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "TailorImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TailorImage" ADD CONSTRAINT "TailorImage_tailor_id_fkey" FOREIGN KEY ("tailor_id") REFERENCES "Tailors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
