/*
  Warnings:

  - You are about to drop the column `clientId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `productId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_productId_fkey`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `clientId`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `client` VARCHAR(191) NOT NULL,
    MODIFY `productId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Client`;
