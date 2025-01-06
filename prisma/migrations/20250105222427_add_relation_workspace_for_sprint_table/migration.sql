-- AlterTable
ALTER TABLE "Sprint" ADD COLUMN     "workspaceId" TEXT;

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
