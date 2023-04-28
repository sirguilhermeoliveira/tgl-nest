/*
  Warnings:

  - You are about to alter the column `price` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "bet_range" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "max_bet_numbers" INTEGER NOT NULL
);
INSERT INTO "new_Game" ("bet_range", "color", "description", "id", "max_bet_numbers", "price", "title") SELECT "bet_range", "color", "description", "id", "max_bet_numbers", "price", "title" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
