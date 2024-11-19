import { getUserCurrentSession } from "@/features/auth/actions/get-user-current-session";
import { EditWorkspaceCard } from "@/features/workspaces/components/edit-workspace-card";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { getWorkspaceById } from "@/features/workspaces/services";
import { redirect } from "next/navigation";

type WorkspaceIdSettingPageProps = {
  params: {
    workspacesId: string;
  };
};
export default async function WorkspaceIdSettingPage({
  params,
}: WorkspaceIdSettingPageProps) {
  const user = await getUserCurrentSession();

  return (
    <div className="flex flex-col">
      <h1>Tasks</h1>
    </div>
  );
}
