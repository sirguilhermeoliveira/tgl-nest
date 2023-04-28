/*
  Warnings:

  - Made the column `forgot_password_expirationTime` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `forgot_password_token` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "bet_numbers" TEXT NOT NULL
);
INSERT INTO "new_Bet" ("bet_numbers", "game_id", "id", "user_id") SELECT "bet_numbers", "game_id", "id", "user_id" FROM "Bet";
DROP TABLE "Bet";
ALTER TABLE "new_Bet" RENAME TO "Bet";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isAdmin" BOOLEAN DEFAULT false,
    "forgot_password_token" TEXT NOT NULL,
    "forgot_password_expirationTime" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "forgot_password_expirationTime", "forgot_password_token", "id", "isAdmin", "name", "password") SELECT "email", "forgot_password_expirationTime", "forgot_password_token", "id", "isAdmin", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
