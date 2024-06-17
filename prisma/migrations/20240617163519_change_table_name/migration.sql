/*
  Warnings:

  - You are about to drop the `Login` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Url` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Url` DROP FOREIGN KEY `Url_userId_fkey`;

-- DropTable
DROP TABLE `Login`;

-- DropTable
DROP TABLE `Url`;

-- CreateTable
CREATE TABLE `login` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `pass` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `login_id_key`(`id`),
    UNIQUE INDEX `login_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `url` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,
    `last_update_count` DATETIME(3) NOT NULL,
    `last_update_url` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `url_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `url` ADD CONSTRAINT `url_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `login`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
