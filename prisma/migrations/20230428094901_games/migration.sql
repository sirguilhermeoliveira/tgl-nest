-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "bet_range" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "max_bet_numbers" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Bet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "bet_numbers" INTEGER NOT NULL
);
