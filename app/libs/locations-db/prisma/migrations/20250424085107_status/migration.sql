/*
  Warnings:

  - Added the required column `status` to the `charging_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "charging_sessions" ADD COLUMN     "status" TEXT NOT NULL;
