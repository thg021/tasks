import { getUserCurrentSession } from "@/features/auth/actions/get-user-current-session";

type WorkspacesIdPageProps = {
  params: {
    workspacesId: string;
  };
};

export default async function WorkspaceHomePage({
  params,
}: WorkspacesIdPageProps) {
  const user = await getUserCurrentSession();
  return <div className="flex flex-col">Workspace HOME </div>;
}
