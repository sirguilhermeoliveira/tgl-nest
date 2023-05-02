-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "bet_range" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "max_bet_numbers" INTEGER NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Game" ("bet_range", "color", "description", "id", "max_bet_numbers", "price", "title") SELECT "bet_range", "color", "description", "id", "max_bet_numbers", "price", "title" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE TABLE "new_Bet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "bet_numbers" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Bet" ("bet_numbers", "game_id", "id", "user_id") SELECT "bet_numbers", "game_id", "id", "user_id" FROM "Bet";
DROP TABLE "Bet";
ALTER TABLE "new_Bet" RENAME TO "Bet";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isAdmin" BOOLEAN DEFAULT false,
    "forgot_password_token" TEXT,
    "forgot_password_expirationTime" DATETIME,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME
);
INSERT INTO "new_User" ("email", "forgot_password_expirationTime", "forgot_password_token", "id", "isAdmin", "name", "password") SELECT "email", "forgot_password_expirationTime", "forgot_password_token", "id", "isAdmin", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
