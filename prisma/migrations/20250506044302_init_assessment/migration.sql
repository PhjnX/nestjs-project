-- CreateTable
CREATE TABLE `assessment_test` (
    `assessment_test_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `time` VARCHAR(10) NULL,
    `time_option` VARCHAR(50) NULL,
    `description` TEXT NULL,
    `total_question` VARCHAR(10) NULL,

    PRIMARY KEY (`assessment_test_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assessment_items` (
    `assessment_items_id` INTEGER NOT NULL AUTO_INCREMENT,
    `assessment_test_id` INTEGER NULL,
    `title` VARCHAR(255) NULL,
    `title_description` TEXT NULL,
    `header_content` TEXT NULL,
    `content` TEXT NULL,

    INDEX `assessment_items_assessment_test_id_idx`(`assessment_test_id`),
    PRIMARY KEY (`assessment_items_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assessment_question` (
    `assessment_question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `assessment_items_id` INTEGER NULL,
    `question_number` VARCHAR(10) NULL,
    `type_question` VARCHAR(50) NULL,
    `question_multiple_choice` TEXT NULL,
    `question_par` TEXT NULL,
    `question_select` TEXT NULL,
    `options` TEXT NULL,
    `answer_multiple_choice` VARCHAR(255) NULL,
    `answer_par` TEXT NULL,
    `answer_select` VARCHAR(255) NULL,
    `result` VARCHAR(50) NULL,
    `gap_count` VARCHAR(10) NULL,

    INDEX `assessment_question_assessment_items_id_idx`(`assessment_items_id`),
    PRIMARY KEY (`assessment_question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `assessment_items` ADD CONSTRAINT `assessment_items_assessment_test_id_fkey` FOREIGN KEY (`assessment_test_id`) REFERENCES `assessment_test`(`assessment_test_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assessment_question` ADD CONSTRAINT `assessment_question_assessment_items_id_fkey` FOREIGN KEY (`assessment_items_id`) REFERENCES `assessment_items`(`assessment_items_id`) ON DELETE CASCADE ON UPDATE CASCADE;
