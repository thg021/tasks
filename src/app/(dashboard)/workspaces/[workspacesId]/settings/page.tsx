import { getCurrent } from "@/features/auth/action";
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
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  const workspace = await getWorkspaceById({
    userId: user?.$id,
    workspaceId: params.workspacesId,
  });

  if (!workspace) redirect(`/workspaces/${params.workspacesId}`);

  return (
    <div className="flex flex-col">
      <EditWorkspaceForm initialValues={workspace} />
      <pre>{JSON.stringify(workspace, null, 2)}</pre>

      {/* <EditWorkspaceCard workspaceId={params.workspacesId} /> */}
    </div>
  );
}
