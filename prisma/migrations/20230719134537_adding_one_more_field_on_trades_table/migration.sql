/*
  Warnings:

  - Added the required column `current_bid_date` to the `trades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trades" ADD COLUMN     "current_bid_date" TEXT NOT NULL;
