/*
  Warnings:

  - You are about to drop the column `duration` on the `reading_test` table. All the data in the column will be lost.
  - You are about to drop the column `key_test` on the `reading_test` table. All the data in the column will be lost.
  - You are about to drop the column `tittle` on the `reading_test` table. All the data in the column will be lost.
  - You are about to drop the `courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `listening_test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `listening_test_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reading_part_1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reading_part_2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reading_part_3` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reading_part_4` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reading_part_5` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `reading_test` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `courses_ibfk_1`;

-- DropForeignKey
ALTER TABLE `listening_test_items` DROP FOREIGN KEY `listening_test_items_ibfk_1`;

-- DropForeignKey
ALTER TABLE `reading_part_1` DROP FOREIGN KEY `reading_part_1_ibfk_1`;

-- DropForeignKey
ALTER TABLE `reading_part_2` DROP FOREIGN KEY `reading_part_2_ibfk_1`;

-- DropForeignKey
ALTER TABLE `reading_part_3` DROP FOREIGN KEY `reading_part_3_ibfk_1`;

-- DropForeignKey
ALTER TABLE `reading_part_4` DROP FOREIGN KEY `reading_part_4_ibfk_1`;

-- DropForeignKey
ALTER TABLE `reading_part_5` DROP FOREIGN KEY `reading_part_5_ibfk_1`;

-- AlterTable
ALTER TABLE `reading_test` DROP COLUMN `duration`,
    DROP COLUMN `key_test`,
    DROP COLUMN `tittle`,
    ADD COLUMN `band` VARCHAR(10) NULL,
    ADD COLUMN `level` VARCHAR(50) NULL,
    ADD COLUMN `name` VARCHAR(255) NULL,
    ADD COLUMN `time` VARCHAR(10) NULL,
    ADD COLUMN `time_option` VARCHAR(50) NULL,
    ADD COLUMN `total_correct` INTEGER NULL,
    ADD COLUMN `total_question` INTEGER NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `courses`;

-- DropTable
DROP TABLE `listening_test`;

-- DropTable
DROP TABLE `listening_test_items`;

-- DropTable
DROP TABLE `reading_part_1`;

-- DropTable
DROP TABLE `reading_part_2`;

-- DropTable
DROP TABLE `reading_part_3`;

-- DropTable
DROP TABLE `reading_part_4`;

-- DropTable
DROP TABLE `reading_part_5`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `active` BOOLEAN NULL DEFAULT true,
    `picture` VARCHAR(255) NULL,
    `level` VARCHAR(50) NULL,
    `band` VARCHAR(10) NULL,
    `role` ENUM('admin', 'user') NULL DEFAULT 'user',

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reading_items` (
    `reading_items_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reading_test_id` INTEGER NULL,
    `title` VARCHAR(255) NULL,
    `title_description` TEXT NULL,
    `header_content` TEXT NULL,
    `content` TEXT NULL,

    INDEX `reading_items_test_idx`(`reading_test_id`),
    PRIMARY KEY (`reading_items_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reading_question` (
    `reading_question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reading_items_id` INTEGER NULL,
    `question_number` INTEGER NULL,
    `type_question` VARCHAR(50) NULL,
    `question_multiple_choice` TEXT NULL,
    `question_par` TEXT NULL,
    `question_select` TEXT NULL,
    `options` TEXT NULL,
    `answer_multiple_choice` VARCHAR(255) NULL,
    `answer_par` TEXT NULL,
    `answer_select` VARCHAR(255) NULL,
    `result` VARCHAR(50) NULL,
    `explanation` TEXT NULL,
    `gap_count` INTEGER NULL,

    INDEX `reading_question_items_idx`(`reading_items_id`),
    PRIMARY KEY (`reading_question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `reading_test_user_idx` ON `reading_test`(`user_id`);

-- AddForeignKey
ALTER TABLE `reading_test` ADD CONSTRAINT `reading_test_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reading_items` ADD CONSTRAINT `reading_items_reading_test_id_fkey` FOREIGN KEY (`reading_test_id`) REFERENCES `reading_test`(`reading_test_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reading_question` ADD CONSTRAINT `reading_question_reading_items_id_fkey` FOREIGN KEY (`reading_items_id`) REFERENCES `reading_items`(`reading_items_id`) ON DELETE CASCADE ON UPDATE CASCADE;
