import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/action";
import Link from "next/link";
import { redirect } from "next/navigation";
type WorkspacesIdPageProps = {
  params: {
    workspacesId: string;
  };
};
export default async function WorkspacesIdPage({
  params,
}: WorkspacesIdPageProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return (
    <div className="flex flex-col">
      Workspaces ID
      <Button variant="ghost" asChild>
        <Link href={`/workspaces/${params.workspacesId}/settings`}>
          Settings
        </Link>
      </Button>
    </div>
  );
}
