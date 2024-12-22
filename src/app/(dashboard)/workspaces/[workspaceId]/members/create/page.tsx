import { getUserCurrentSession } from '@/features/auth/actions/get-user-current-session';
import { CreateMemberForm } from '@/features/members/components/create-member-form';

export default async function CreateMemberPage() {
  await getUserCurrentSession();

  return (
    <div className="w-full lg:max-w-7xl">
      <CreateMemberForm />
    </div>
  );
}
