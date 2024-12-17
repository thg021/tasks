import { ExternalLinkIcon, PencilIcon, TrashIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useConfirm } from '@/hooks/use-confirm';
import { useDeleteTask } from '../api/use-delete-task';

type TaskActionsProps = {
  id: string;
  projectId: string;
  children: React.ReactNode;
};
export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
  const { mutate: deleteTask } = useDeleteTask();
  const [DeleteDialog, confirmDelete] = useConfirm(
    'Excluir tarefa',
    'Tem certeza que deseja excluir esta tarefa?',
    'destructive'
  );
  const handleDeleteTask = async () => {
    const ok = await confirmDelete();
    if (!ok) return;

    deleteTask({
      param: {
        taskId: id,
        projectId
      }
    });
  };
  return (
    <div className="flex justify-end">
      <DeleteDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => {}} disabled={false} className="p-[10px] font-medium">
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Detalhes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}} disabled={false} className="p-[10px] font-medium">
            <PencilIcon className="mr-2 size-4 stroke-2" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteTask}
            disabled={false}
            className="p-[10px] font-medium"
          >
            <TrashIcon className="mr-2 size-4 stroke-2 text-red-500" />
            <span className="text-red-500">Deletar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
