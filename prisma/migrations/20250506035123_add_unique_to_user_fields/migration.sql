/*
  Warnings:

  - You are about to alter the column `user_name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - A unique constraint covering the columns `[user_name]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `active` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `user_name` VARCHAR(191) NOT NULL,
    MODIFY `active` BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX `user_user_name_key` ON `user`(`user_name`);

-- CreateIndex
CREATE UNIQUE INDEX `user_phone_number_key` ON `user`(`phone_number`);
