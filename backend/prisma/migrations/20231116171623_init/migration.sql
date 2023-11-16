-- CreateTable
CREATE TABLE `User` (
    `address` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL DEFAULT 'noname',
    `email` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Store` (
    `shop_name` VARCHAR(191) NOT NULL,
    `meta_uri` VARCHAR(191) NOT NULL,
    `image_uri` VARCHAR(191) NOT NULL,
    `coord` VARCHAR(191) NOT NULL DEFAULT '[]',
    `location` VARCHAR(191) NOT NULL,
    `owner_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`shop_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` VARCHAR(191) NOT NULL,
    `store_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`address`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`shop_name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`address`) ON DELETE RESTRICT ON UPDATE CASCADE;
