/*
  Warnings:

  - Added the required column `position` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Status" ADD COLUMN     "position" INTEGER NOT NULL;
