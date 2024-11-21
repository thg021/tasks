/*
  Warnings:

  - You are about to drop the `MemberWorkspace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MemberWorkspace" DROP CONSTRAINT "MemberWorkspace_memberId_fkey";

-- DropForeignKey
ALTER TABLE "MemberWorkspace" DROP CONSTRAINT "MemberWorkspace_workspaceId_fkey";

-- DropTable
DROP TABLE "MemberWorkspace";

-- CreateTable
CREATE TABLE "_MemberToWorkspace" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MemberToWorkspace_AB_unique" ON "_MemberToWorkspace"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberToWorkspace_B_index" ON "_MemberToWorkspace"("B");

-- AddForeignKey
ALTER TABLE "_MemberToWorkspace" ADD CONSTRAINT "_MemberToWorkspace_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToWorkspace" ADD CONSTRAINT "_MemberToWorkspace_B_fkey" FOREIGN KEY ("B") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
