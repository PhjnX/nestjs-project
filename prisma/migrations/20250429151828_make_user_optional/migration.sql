/*
  Warnings:

  - You are about to drop the column `user_id` on the `reading_test` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `reading_items` DROP FOREIGN KEY `reading_items_reading_test_id_fkey`;

-- DropForeignKey
ALTER TABLE `reading_question` DROP FOREIGN KEY `reading_question_reading_items_id_fkey`;

-- DropForeignKey
ALTER TABLE `reading_test` DROP FOREIGN KEY `reading_test_user_id_fkey`;

-- DropIndex
DROP INDEX `reading_test_user_idx` ON `reading_test`;

-- AlterTable
ALTER TABLE `reading_question` MODIFY `question_number` VARCHAR(10) NULL,
    MODIFY `gap_count` VARCHAR(10) NULL;

-- AlterTable
ALTER TABLE `reading_test` DROP COLUMN `user_id`,
    MODIFY `total_correct` VARCHAR(10) NULL,
    MODIFY `total_question` VARCHAR(10) NULL;

-- AddForeignKey
ALTER TABLE `reading_items` ADD CONSTRAINT `reading_items_ibfk_1` FOREIGN KEY (`reading_test_id`) REFERENCES `reading_test`(`reading_test_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reading_question` ADD CONSTRAINT `reading_question_ibfk_1` FOREIGN KEY (`reading_items_id`) REFERENCES `reading_items`(`reading_items_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `reading_items` RENAME INDEX `reading_items_test_idx` TO `reading_test_id`;

-- RenameIndex
ALTER TABLE `reading_question` RENAME INDEX `reading_question_items_idx` TO `reading_items_id`;
