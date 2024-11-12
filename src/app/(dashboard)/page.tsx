import { getCurrent } from "@/features/auth/action";
import { getWorkspaces } from "@/features/workspaces/action";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { first, head, size } from "lodash";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspaces = await getWorkspaces();
  if (!workspaces || workspaces?.total === 0 || size(workspaces.data) === 0) {
    redirect("/workspaces/create?create-workspace=true");
  }
  const workspace = first(workspaces.data);
  redirect(`/workspaces/${workspace?.$id}`);
}
