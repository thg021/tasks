import { getUserCurrentSession } from "@/features/auth/actions/get-user-current-session";
import { MembersList } from "@/features/members/components/members-list";
import { redirect } from "next/navigation";

type MembersPageProps = {
  params: {
    workspacesId: string;
  };
};
export default async function MembersPage({ params }: MembersPageProps) {
  const user = await getUserCurrentSession();

  if (user?.role !== "ADMIN") {
    redirect(`/workspaces/${params.workspacesId}`);
  }

  return (
    <div className="w-full lg:max-w-7xl">
      <MembersList />
    </div>
  );
}
