/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Tailors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tailors_user_id_key" ON "Tailors"("user_id");
