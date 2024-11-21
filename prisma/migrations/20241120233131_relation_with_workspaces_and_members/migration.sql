/*
  Warnings:

  - You are about to drop the `PasswordResetToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_workspaceId_fkey";

-- DropTable
DROP TABLE "PasswordResetToken";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "MemberWorkspace" (
    "memberId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "MemberWorkspace_pkey" PRIMARY KEY ("memberId","workspaceId")
);

-- CreateIndex
CREATE INDEX "MemberWorkspace_memberId_idx" ON "MemberWorkspace"("memberId");

-- CreateIndex
CREATE INDEX "MemberWorkspace_workspaceId_idx" ON "MemberWorkspace"("workspaceId");

-- AddForeignKey
ALTER TABLE "MemberWorkspace" ADD CONSTRAINT "MemberWorkspace_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberWorkspace" ADD CONSTRAINT "MemberWorkspace_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
