/*
  Warnings:

  - You are about to drop the column `status` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "StateOrder" ADD VALUE 'PAYMENT';
ALTER TYPE "StateOrder" ADD VALUE 'CANCELLED';
ALTER TYPE "StateOrder" ADD VALUE 'DONE';

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "status";

-- DropEnum
DROP TYPE "StatusOrder";
