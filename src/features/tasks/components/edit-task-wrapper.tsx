'use client';
import { omit } from 'lodash';
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
  const { data: taskData, isLoading: isLoadingTask } = useGetTask({
    taskId: id,
    workspaceId,
    projectId
  });

  //const router = useRouter();
  if (!taskData?.data && !isLoadingTask) {
    return <div>task not found</div>;
  }

  if (isLoadingTask) {
    return (
      <Card className="size-full border-none shadow-none">
        <CardContent>
          <Loader className="size-3 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  const task = {
    ...omit(taskData?.data, ['project']),
    dueDate: new Date(taskData?.data?.dueDate || ''),
    createdAt: new Date(taskData?.data?.createdAt || ''),
    updatedAt: new Date(taskData?.data?.updatedAt || '')
  };

  return (
    <Card className="size-full border-none shadow-none">
      <CardContent className="p-7">
        {task && <EditTaskForm id={id} initialValue={task} />}
      </CardContent>
    </Card>
  );
};
