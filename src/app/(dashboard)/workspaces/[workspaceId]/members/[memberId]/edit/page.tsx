import { getUserCurrentSession } from '@/features/auth/actions/get-user-current-session';
import { getMember } from '@/features/members/actions/get-member-by-id';
import { EditMemberForm } from '@/features/members/components/edit-member-form';

type EditMemberPageProps = {
  params: {
    workspaceId: string;
    memberId: string;
  };
};

export default async function EditMemberPage({ params }: EditMemberPageProps) {
  const user = await getUserCurrentSession();
  const member = await getMember({ user, ...params });
  if (!member) {
    return <div>Membro não encontrado</div>;
  }

  return (
    <div className="w-full lg:max-w-7xl">{member && <EditMemberForm initialData={member} />}</div>
  );
}
