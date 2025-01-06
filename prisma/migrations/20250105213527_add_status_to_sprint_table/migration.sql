/*
  Warnings:

  - Added the required column `updatedAt` to the `Sprint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TaskBlock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sprint" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "actualStoryPoints" INTEGER DEFAULT 0,
ADD COLUMN     "actualTime" INTEGER DEFAULT 0,
ADD COLUMN     "blockedTime" INTEGER DEFAULT 0,
ADD COLUMN     "estimatedTime" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "storyPoints" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "TaskBlock" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
