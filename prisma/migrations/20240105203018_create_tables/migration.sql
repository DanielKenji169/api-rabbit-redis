-- CreateTable
CREATE TABLE "Books" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "genre" TEXT,
    "author" TEXT,
    "rented" BOOLEAN DEFAULT false,
    "rentedDays" INTEGER,
    "forSale" BOOLEAN,
    "forRent" BOOLEAN
);

-- CreateTable
CREATE TABLE "Movies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "genre" TEXT,
    "author" TEXT,
    "rented" BOOLEAN DEFAULT false,
    "rentedDays" INTEGER,
    "forSale" BOOLEAN,
    "forRent" BOOLEAN
);

-- CreateTable
CREATE TABLE "Series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "genre" TEXT,
    "author" TEXT,
    "rented" BOOLEAN DEFAULT false,
    "rentedDays" INTEGER,
    "forSale" BOOLEAN,
    "forRent" BOOLEAN
);

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "_BooksToClient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BooksToClient_A_fkey" FOREIGN KEY ("A") REFERENCES "Books" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BooksToClient_B_fkey" FOREIGN KEY ("B") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ClientToMovies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ClientToMovies_A_fkey" FOREIGN KEY ("A") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClientToMovies_B_fkey" FOREIGN KEY ("B") REFERENCES "Movies" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ClientToSeries" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ClientToSeries_A_fkey" FOREIGN KEY ("A") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClientToSeries_B_fkey" FOREIGN KEY ("B") REFERENCES "Series" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_BooksToClient_AB_unique" ON "_BooksToClient"("A", "B");

-- CreateIndex
CREATE INDEX "_BooksToClient_B_index" ON "_BooksToClient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClientToMovies_AB_unique" ON "_ClientToMovies"("A", "B");

-- CreateIndex
CREATE INDEX "_ClientToMovies_B_index" ON "_ClientToMovies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClientToSeries_AB_unique" ON "_ClientToSeries"("A", "B");

-- CreateIndex
CREATE INDEX "_ClientToSeries_B_index" ON "_ClientToSeries"("B");
