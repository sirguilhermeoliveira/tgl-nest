/*
  Warnings:

  - You are about to alter the column `bet_numbers` on the `Bet` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "bet_numbers" INTEGER NOT NULL
);
INSERT INTO "new_Bet" ("bet_numbers", "game_id", "id", "user_id") SELECT "bet_numbers", "game_id", "id", "user_id" FROM "Bet";
DROP TABLE "Bet";
ALTER TABLE "new_Bet" RENAME TO "Bet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
