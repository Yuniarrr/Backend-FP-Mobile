/*
  Warnings:

  - The values [CANCELLED] on the enum `StateOrder` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('AWAITING', 'ONGOING', 'DONE', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "StateOrder_new" AS ENUM ('AWAITING', 'MEASURING', 'SEWING', 'FITTING', 'DELIVER');
ALTER TABLE "Orders" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Orders" ALTER COLUMN "state" TYPE "StateOrder_new" USING ("state"::text::"StateOrder_new");
ALTER TYPE "StateOrder" RENAME TO "StateOrder_old";
ALTER TYPE "StateOrder_new" RENAME TO "StateOrder";
DROP TYPE "StateOrder_old";
ALTER TABLE "Orders" ALTER COLUMN "state" SET DEFAULT 'AWAITING';
COMMIT;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "status" "StatusOrder" NOT NULL DEFAULT 'AWAITING';
