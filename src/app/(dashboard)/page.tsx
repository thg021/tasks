'use client';

import { redirect } from 'next/navigation';
import { first } from 'lodash';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';

export default function Home() {
  const { data: workspaces, isLoading } = useGetWorkspaces();
  if (isLoading) return;
  if (workspaces && workspaces?.total === 0) {
    redirect('/workspaces/create');
  }

  const workspace = first(workspaces?.data);
  redirect(`/workspaces/${workspace?.id}`);
}
