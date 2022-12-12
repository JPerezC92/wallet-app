/*
  Warnings:

  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyValue` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Transaction_userId_idx` ON `Transaction`;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `userId`,
    ADD COLUMN `accountId` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `currencyValue` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `Account_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Currency` (
    `value` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Currency_value_key`(`value`),
    PRIMARY KEY (`value`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Transaction_accountId_idx` ON `Transaction`(`accountId`);

-- CreateIndex
CREATE INDEX `Transaction_currencyValue_idx` ON `Transaction`(`currencyValue`);
