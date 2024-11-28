import { getUserCurrentSession } from '@/features/auth/actions/get-user-current-session';
import { MembersList } from '@/features/members/components/members-list';

export default async function MembersPage() {
  await getUserCurrentSession();

  return (
    <div className="w-full lg:max-w-7xl">
      <MembersList />
    </div>
  );
}
