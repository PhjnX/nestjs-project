/*
  Warnings:

  - You are about to drop the `AssessmentPart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AssessmentPart` DROP FOREIGN KEY `AssessmentPart_assessmentId_fkey`;

-- DropForeignKey
ALTER TABLE `QuestionGroup` DROP FOREIGN KEY `QuestionGroup_partId_fkey`;

-- DropIndex
DROP INDEX `QuestionGroup_partId_fkey` ON `QuestionGroup`;

-- AlterTable
ALTER TABLE `AssessmentQuestion` ADD COLUMN `lineReference` VARCHAR(191) NULL,
    ADD COLUMN `showAnswer` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `assessment_test` ADD COLUMN `isTest` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `totalQuestions` INTEGER NOT NULL DEFAULT 40;

-- DropTable
DROP TABLE `AssessmentPart`;

-- CreateTable
CREATE TABLE `assessmentPart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `instructions` VARCHAR(191) NULL,
    `titleDescription` VARCHAR(191) NULL,
    `headerContent` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `assessmentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assessment_result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `assessmentId` INTEGER NOT NULL,
    `correctCount` INTEGER NOT NULL,
    `totalQuestions` INTEGER NOT NULL,
    `bandScore` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `assessmentPart` ADD CONSTRAINT `assessmentPart_assessmentId_fkey` FOREIGN KEY (`assessmentId`) REFERENCES `assessment_test`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionGroup` ADD CONSTRAINT `QuestionGroup_partId_fkey` FOREIGN KEY (`partId`) REFERENCES `assessmentPart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assessment_result` ADD CONSTRAINT `assessment_result_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assessment_result` ADD CONSTRAINT `assessment_result_assessmentId_fkey` FOREIGN KEY (`assessmentId`) REFERENCES `assessment_test`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
