import { getUserCurrentSession } from '@/features/auth/actions/get-user-current-session';

export default async function WorkspaceIdSettingPage() {
  await getUserCurrentSession();

  return (
    <div className="flex flex-col">
      <h1>Tasks</h1>
    </div>
  );
}
