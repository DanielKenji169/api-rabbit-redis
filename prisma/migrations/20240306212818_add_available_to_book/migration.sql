-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Books" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "genre" TEXT,
    "author" TEXT,
    "rented" BOOLEAN DEFAULT false,
    "rentedDays" INTEGER,
    "forSale" BOOLEAN,
    "forRent" BOOLEAN,
    "availabe" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Books" ("author", "forRent", "forSale", "genre", "id", "rented", "rentedDays", "title") SELECT "author", "forRent", "forSale", "genre", "id", "rented", "rentedDays", "title" FROM "Books";
DROP TABLE "Books";
ALTER TABLE "new_Books" RENAME TO "Books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
