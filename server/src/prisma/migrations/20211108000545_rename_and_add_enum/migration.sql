/*
  Warnings:

  - You are about to drop the column `buyerId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Buyer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BuyerToLocation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[destinationId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `destinationId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('PRIVATE', 'AVALIABLE', 'BOUGHT');

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_locationId_fkey";

-- DropForeignKey
ALTER TABLE "_BuyerToLocation" DROP CONSTRAINT "_BuyerToLocation_A_fkey";

-- DropForeignKey
ALTER TABLE "_BuyerToLocation" DROP CONSTRAINT "_BuyerToLocation_B_fkey";

-- DropIndex
DROP INDEX "Ticket_buyerId_key";

-- DropIndex
DROP INDEX "Ticket_locationId_key";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "buyerId",
DROP COLUMN "locationId",
ADD COLUMN     "destinationId" TEXT NOT NULL,
ADD COLUMN     "status" "TicketStatus" NOT NULL DEFAULT E'PRIVATE',
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "Buyer";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "_BuyerToLocation";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL,
    "destination" TEXT NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DestinationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Destination_destination_key" ON "Destination"("destination");

-- CreateIndex
CREATE UNIQUE INDEX "_DestinationToUser_AB_unique" ON "_DestinationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DestinationToUser_B_index" ON "_DestinationToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_userId_key" ON "Ticket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_destinationId_key" ON "Ticket"("destinationId");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DestinationToUser" ADD FOREIGN KEY ("A") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DestinationToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
