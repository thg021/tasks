/*
  Warnings:

  - You are about to drop the column `workspaceId` on the `Member` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Member_workspaceId_idx";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "workspaceId";
