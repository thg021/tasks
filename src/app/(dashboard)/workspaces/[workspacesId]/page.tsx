import { getUserCurrentSession } from "@/features/auth/action";
import { redirect } from "next/navigation";
type WorkspacesIdPageProps = {
  params: {
    workspacesId: string;
  };
};
export default async function TasksPage({ params }: WorkspacesIdPageProps) {
  const user = await getUserCurrentSession();
  return <div className="flex flex-col">Tasks</div>;
}
