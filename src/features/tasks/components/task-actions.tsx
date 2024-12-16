import { ExternalLinkIcon, PencilIcon, TrashIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

type TaskActionsProps = {
  id: string;
  projectId: string;
  children: React.ReactNode;
};
export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
  // eslint-disable-next-line no-console
  console.log(id, projectId);
  return (
    <div className="flex justify-end">
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
          <DropdownMenuItem onClick={() => {}} disabled={false} className="p-[10px] font-medium">
            <TrashIcon className="mr-2 size-4 stroke-2 text-red-500" />
            <span className="text-red-500">Deletar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
