/*
  Warnings:

  - The primary key for the `assessment_test` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assessment_test_id` on the `assessment_test` table. All the data in the column will be lost.
  - You are about to drop the column `time_option` on the `assessment_test` table. All the data in the column will be lost.
  - You are about to drop the column `total_question` on the `assessment_test` table. All the data in the column will be lost.
  - You are about to drop the `assessment_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `assessment_question` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `assessment_test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `assessment_test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `assessment_test` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `assessment_test` required. This step will fail if there are existing NULL values in that column.
  - Made the column `time` on table `assessment_test` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `assessment_items` DROP FOREIGN KEY `assessment_items_assessment_test_id_fkey`;

-- DropForeignKey
ALTER TABLE `assessment_question` DROP FOREIGN KEY `assessment_question_assessment_items_id_fkey`;

-- AlterTable
ALTER TABLE `assessment_test` DROP PRIMARY KEY,
    DROP COLUMN `assessment_test_id`,
    DROP COLUMN `time_option`,
    DROP COLUMN `total_question`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `level` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `time` INTEGER NOT NULL,
    MODIFY `description` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `assessment_items`;

-- DropTable
DROP TABLE `assessment_question`;

-- CreateTable
CREATE TABLE `AssessmentPart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assessmentId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `instructions` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestionGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partId` INTEGER NOT NULL,
    `questionType` VARCHAR(191) NOT NULL,
    `heading` VARCHAR(191) NOT NULL,
    `startNumber` INTEGER NOT NULL,
    `endNumber` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentQuestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupId` INTEGER NOT NULL,
    `questionText` VARCHAR(191) NOT NULL,
    `options` VARCHAR(191) NULL,
    `correctAnswer` VARCHAR(191) NOT NULL,
    `explanation` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `paragraphHeading` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssessmentPart` ADD CONSTRAINT `AssessmentPart_assessmentId_fkey` FOREIGN KEY (`assessmentId`) REFERENCES `assessment_test`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionGroup` ADD CONSTRAINT `QuestionGroup_partId_fkey` FOREIGN KEY (`partId`) REFERENCES `AssessmentPart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentQuestion` ADD CONSTRAINT `AssessmentQuestion_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `QuestionGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
