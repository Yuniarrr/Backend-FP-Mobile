/*
  Warnings:

  - The `open_days` column on the `Tailors` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Tailors" DROP COLUMN "open_days",
ADD COLUMN     "open_days" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "phone_number" TEXT;
