import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { CreateProjectModal } from '@/features/projects/components/create-project-modal';
import { EditProjectModal } from '@/features/projects/components/edit-project-modal';
import { CreateWorkspaceModal } from '@/features/workspaces/components/create-workspace-modal';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <EditProjectModal />
      <div className="flex size-full">
        <div className="fixed left-0 top-0 hidden h-full overflow-y-auto lg:block lg:w-[264px]">
          <Sidebar />
        </div>
        <div className="w-full lg:pl-[264px]">
          <div className="mx-auto h-full max-w-screen-2xl">
            <Navbar />
            <main className="flex h-full flex-col px-6 py-8">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
