/*
  Warnings:

  - You are about to alter the column `money` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Account` MODIFY `money` INTEGER NOT NULL DEFAULT 0;
