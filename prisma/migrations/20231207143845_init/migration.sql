/*
  Warnings:

  - You are about to alter the column `places` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "places" INTEGER NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "eventType" TEXT,
    "clubId" INTEGER NOT NULL,
    "description" TEXT,
    CONSTRAINT "Event_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("address", "city", "clubId", "country", "description", "endDate", "eventType", "id", "name", "places", "startDate") SELECT "address", "city", "clubId", "country", "description", "endDate", "eventType", "id", "name", "places", "startDate" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
