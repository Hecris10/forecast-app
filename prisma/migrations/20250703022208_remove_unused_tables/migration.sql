/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `saved_location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "saved_location" DROP CONSTRAINT "saved_location_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "saved_location";
