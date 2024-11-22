import { getUserCurrentSession } from '@/features/auth/actions/get-user-current-session';

export default async function WorkspaceHomePage() {
  await getUserCurrentSession();
  return <div className="flex flex-col">Workspace HOME </div>;
}
