-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_payment_method_fkey";

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "payment_method" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payment_method_fkey" FOREIGN KEY ("payment_method") REFERENCES "PaymentMethods"("id") ON DELETE SET NULL ON UPDATE CASCADE;
