import { getUserCurrentSession } from '@/features/auth/actions/get-user-current-session';

type TaskIdPageProps = {
  params: {
    taskId: string;
  };
};
export default async function TaskIdPage({ params }: TaskIdPageProps) {
  await getUserCurrentSession();

  return (
    <div className="flex flex-col">
      <h1>Tasks - {params.taskId}</h1>
    </div>
  );
}
