-- DropForeignKey
ALTER TABLE `assessmentPart` DROP FOREIGN KEY `assessmentPart_assessmentId_fkey`;

-- DropForeignKey
ALTER TABLE `assessment_result` DROP FOREIGN KEY `assessment_result_assessmentId_fkey`;

-- DropForeignKey
ALTER TABLE `assessment_result` DROP FOREIGN KEY `assessment_result_userId_fkey`;

-- DropIndex
DROP INDEX `assessmentPart_assessmentId_fkey` ON `assessmentPart`;

-- DropIndex
DROP INDEX `assessment_result_assessmentId_fkey` ON `assessment_result`;

-- DropIndex
DROP INDEX `assessment_result_userId_fkey` ON `assessment_result`;

-- AlterTable
ALTER TABLE `assessmentPart` MODIFY `headerContent` TEXT NULL,
    MODIFY `content` TEXT NULL;

-- AddForeignKey
ALTER TABLE `assessmentPart` ADD CONSTRAINT `assessmentPart_assessmentId_fkey` FOREIGN KEY (`assessmentId`) REFERENCES `assessment_test`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assessment_result` ADD CONSTRAINT `assessment_result_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assessment_result` ADD CONSTRAINT `assessment_result_assessmentId_fkey` FOREIGN KEY (`assessmentId`) REFERENCES `assessment_test`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
