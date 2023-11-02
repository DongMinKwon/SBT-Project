-- CreateTable
CREATE TABLE "User" (
    "address" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL DEFAULT 'noname',
    "email" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Store" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop_name" TEXT NOT NULL,
    "meta_uri" TEXT NOT NULL,
    "image_uri" TEXT NOT NULL,
    "coord" TEXT NOT NULL DEFAULT '[]',
    "location" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    CONSTRAINT "Store_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User" ("address") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" TEXT NOT NULL,
    "store_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Token_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("address") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_store_id_key" ON "Token"("store_id");
