import { getCurrent } from "@/features/auth/action";
import { redirect } from "next/navigation";
export default async function WorkspacesIdPage() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return <div className="flex flex-col">Workspaces ID</div>;
}
