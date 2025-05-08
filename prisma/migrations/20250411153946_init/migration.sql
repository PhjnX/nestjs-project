-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(100) NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(20) NULL,
    `role` ENUM('admin', 'student', 'lecturer') NULL DEFAULT 'student',
    `status` ENUM('active', 'inactive') NULL DEFAULT 'active',
    `create_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `last_day` DATETIME(0) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `course_id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_name` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `user_id` INTEGER NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `listening_test` (
    `listening_test_id` INTEGER NOT NULL AUTO_INCREMENT,
    `key_test` VARCHAR(50) NULL,
    `tittle` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `duration` INTEGER NULL,

    PRIMARY KEY (`listening_test_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `listening_test_items` (
    `listening_test_items_id` INTEGER NOT NULL AUTO_INCREMENT,
    `listening_test_id` INTEGER NULL,
    `question_number` VARCHAR(100) NULL,
    `tittle` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `content` TEXT NULL,
    `correct_answer` VARCHAR(60) NULL,
    `options` TEXT NULL,
    `script` TEXT NULL,
    `topic` VARCHAR(100) NULL,
    `hidden_correct_aswer` BOOLEAN NULL DEFAULT true,

    INDEX `listening_test_id`(`listening_test_id`),
    PRIMARY KEY (`listening_test_items_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reading_part_1` (
    `reading_part_1_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reading_test_id` INTEGER NULL,
    `title` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `content` TEXT NULL,
    `correct_answer` VARCHAR(10) NULL,
    `options` TEXT NULL,

    INDEX `reading_test_id`(`reading_test_id`),
    PRIMARY KEY (`reading_part_1_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reading_part_2` (
    `reading_part_2_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reading_test_id` INTEGER NULL,
    `title` VARCHAR(100) NULL,
    `name_of_test` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `content` TEXT NULL,
    `sort_order` INTEGER NULL,

    INDEX `reading_test_id`(`reading_test_id`),
    PRIMARY KEY (`reading_part_2_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reading_part_3` (
    `reading_part_3_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reading_test_id` INTEGER NULL,
    `title` VARCHAR(100) NULL,
    `name_of_test` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `content` TEXT NULL,
    `sort_order` INTEGER NULL,

    INDEX `reading_test_id`(`reading_test_id`),
    PRIMARY KEY (`reading_part_3_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reading_part_4` (
    `reading_part_4_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reading_test_id` INTEGER NULL,
    `title` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `paragraph_text` TEXT NULL,
    `content` TEXT NULL,
    `correct_answer` VARCHAR(10) NULL,
    `options` TEXT NULL,

    INDEX `reading_test_id`(`reading_test_id`),
    PRIMARY KEY (`reading_part_4_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reading_part_5` (
    `reading_part_5_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reading_test_id` INTEGER NULL,
    `title` VARCHAR(100) NULL,
    `name_of_test` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `content` TEXT NULL,
    `sort_order` INTEGER NULL,
    `hidden_correct_aswer` BOOLEAN NULL DEFAULT true,

    INDEX `reading_test_id`(`reading_test_id`),
    PRIMARY KEY (`reading_part_5_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reading_test` (
    `reading_test_id` INTEGER NOT NULL AUTO_INCREMENT,
    `key_test` VARCHAR(50) NULL,
    `tittle` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `duration` INTEGER NULL,

    PRIMARY KEY (`reading_test_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `listening_test_items` ADD CONSTRAINT `listening_test_items_ibfk_1` FOREIGN KEY (`listening_test_id`) REFERENCES `listening_test`(`listening_test_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reading_part_1` ADD CONSTRAINT `reading_part_1_ibfk_1` FOREIGN KEY (`reading_test_id`) REFERENCES `reading_test`(`reading_test_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reading_part_2` ADD CONSTRAINT `reading_part_2_ibfk_1` FOREIGN KEY (`reading_test_id`) REFERENCES `reading_test`(`reading_test_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reading_part_3` ADD CONSTRAINT `reading_part_3_ibfk_1` FOREIGN KEY (`reading_test_id`) REFERENCES `reading_test`(`reading_test_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reading_part_4` ADD CONSTRAINT `reading_part_4_ibfk_1` FOREIGN KEY (`reading_test_id`) REFERENCES `reading_test`(`reading_test_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reading_part_5` ADD CONSTRAINT `reading_part_5_ibfk_1` FOREIGN KEY (`reading_test_id`) REFERENCES `reading_test`(`reading_test_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
