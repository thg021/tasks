import { getCurrent } from "@/features/auth/action";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { WorkspaceSwitcher } from "@/features/workspaces/components/workspace-switcher";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return (
    <div className="flex flex-col">
      <CreateWorkspaceForm />
    </div>
  );
}
