/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Bet` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "bet_range" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "max_bet_numbers" INTEGER NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Game" ("bet_range", "color", "created_At", "description", "id", "max_bet_numbers", "price", "title") SELECT "bet_range", "color", "created_At", "description", "id", "max_bet_numbers", "price", "title" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isAdmin" BOOLEAN DEFAULT false,
    "forgot_password_token" TEXT,
    "forgot_password_expirationTime" DATETIME,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME
);
INSERT INTO "new_User" ("created_At", "email", "forgot_password_expirationTime", "forgot_password_token", "id", "isAdmin", "name", "password", "updated_At") SELECT "created_At", "email", "forgot_password_expirationTime", "forgot_password_token", "id", "isAdmin", "name", "password", "updated_At" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Bet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "bet_numbers" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Bet" ("bet_numbers", "created_At", "game_id", "id", "user_id") SELECT "bet_numbers", "created_At", "game_id", "id", "user_id" FROM "Bet";
DROP TABLE "Bet";
ALTER TABLE "new_Bet" RENAME TO "Bet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
