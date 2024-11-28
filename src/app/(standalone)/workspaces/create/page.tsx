import { getUserCurrentSession } from '@/features/auth/actions';
import { CreateWorkspaceForm } from '@/features/workspaces/components/create-workspace-form';

export default async function StandalonePage() {
  await getUserCurrentSession();
  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkspaceForm />
    </div>
  );
}
