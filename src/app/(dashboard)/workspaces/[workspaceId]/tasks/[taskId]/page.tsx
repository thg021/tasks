import { notFound } from 'next/navigation';
import { getUserCurrentSession } from '@/features/auth/actions/get-user-current-session';
import { getTaskById } from '@/features/tasks/actions/get-task-by-id';
import { EditTaskForm } from '@/features/tasks/components/edit-task-form';

type TaskIdPageProps = {
  params: {
    taskId: string;
    workspaceId: string;
  };
};
export default async function TaskIdPage({ params }: TaskIdPageProps) {
  const user = await getUserCurrentSession();

  const task = await getTaskById({ ...params, user });
  if (!task) {
    notFound();
  }
  return <EditTaskForm initialValue={task} />;
}
