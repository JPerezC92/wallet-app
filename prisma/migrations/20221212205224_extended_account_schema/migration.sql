/*
  Warnings:

  - You are about to drop the column `currencyValue` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `currencyValue` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `money` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Transaction_currencyValue_idx` ON `Transaction`;

-- AlterTable
ALTER TABLE `Account` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `currencyValue` VARCHAR(191) NOT NULL,
    ADD COLUMN `money` BIGINT NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `currencyValue`;

-- CreateIndex
CREATE INDEX `Account_currencyValue_idx` ON `Account`(`currencyValue`);
