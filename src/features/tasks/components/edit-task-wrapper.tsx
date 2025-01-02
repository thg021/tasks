'use client';
import { Loader } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useParamProjectId } from '@/features/projects/hooks/use-param-project-id';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useGetTask } from '../api/use-get-task';
import { EditTaskForm } from './edit-task-form';

type EditTaskFormProps = {
  id: string;
};
export const EditTaskWrapper = ({ id }: EditTaskFormProps) => {
  const workspaceId = useWorkspaceId();
  const projectId = useParamProjectId();
  const { data: task, isLoading: isLoadingTask } = useGetTask({
    taskId: id,
    workspaceId,
    projectId
  });

  if (isLoadingTask) {
    return (
      <Card className="size-full border-none shadow-none">
        <CardContent>
          <Loader className="size-3 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  //const router = useRouter();
  if (!task && !isLoadingTask) {
    return <div>task not found</div>;
  }

  return (
    <Card className="size-full border-none shadow-none">
      <CardContent className="p-7">
        {task?.data && <EditTaskForm initialValue={task.data} />}
      </CardContent>
    </Card>
  );
};
