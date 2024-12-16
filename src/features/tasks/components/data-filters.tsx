import { map } from 'lodash';
import { Folder, ListCheckIcon, UserIcon } from 'lucide-react';
import { DatePicker } from '@/components/date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { MemberAvatar } from '@/features/members/components/member-avatar';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useParamProjectId } from '@/features/projects/hooks/use-param-project-id';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { SelectSeparator } from '@radix-ui/react-select';
import { useTasksFilters } from '../hooks/use-tasks-filters';
import { TaskStatus } from '../types';

type DataFiltersProps = {
  hideProjectFilter?: boolean;
};

export const DataFilters = ({ hideProjectFilter = false }: DataFiltersProps) => {
  const workspaceId = useWorkspaceId();
  const projectIdParam = useParamProjectId();
  // TODO: usar esta var hideProjectFilter
  // eslint-disable-next-line no-console
  console.log(hideProjectFilter);

  const { data: projects } = useGetProjects({ workspaceId });

  const [{ status, projectId, dueDate, assignedId }, setFilter] = useTasksFilters();

  const onStatusChange = (value: string) => {
    setFilter({ status: value === 'all' ? null : (value as TaskStatus) });
  };

  const onAssignedChange = (value: string) => {
    setFilter({ assignedId: value === 'all' ? null : (value as TaskStatus) });
  };

  const onProjectChange = (value: string) => {
    setFilter({ projectId: value === 'all' ? null : (value as TaskStatus) });
  };
  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <Select defaultValue={status ?? undefined} onValueChange={(value) => onStatusChange(value)}>
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pr-2">
            <ListCheckIcon className="sizes-4 mr-2" />
            <SelectValue placeholder="Status"></SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">todos status</SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG}>
            <div className="flex items-center gap-x-2">Backlog</div>
          </SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>
            <div className="flex items-center gap-x-2">Em andamento</div>
          </SelectItem>
          <SelectItem value={TaskStatus.DONE}>
            <div className="flex items-center gap-x-2">Concluído</div>
          </SelectItem>
          <SelectItem value={TaskStatus.TODO}>
            <div className="flex items-center gap-x-2">Novo</div>
          </SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>
            <div className="flex items-center gap-x-2">Em revisão</div>
          </SelectItem>
          <SelectItem value={TaskStatus.QA}>
            <div className="flex items-center gap-x-2">QA</div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        defaultValue={assignedId ?? undefined}
        onValueChange={(value) => onAssignedChange(value)}
        disabled={!projects?.data?.member}
      >
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pr-2">
            <UserIcon className="sizes-2 mr-2" />
            <SelectValue placeholder="Responsáveis" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">todos responsáveis</SelectItem>
          <SelectSeparator />
          {projects?.data?.member &&
            map(projects.data.member, (member) => (
              <SelectItem key={member.id} value={member.id}>
                <div className="flex items-center gap-x-2">
                  <MemberAvatar name={member.name} className="size-6" />
                  {member.name}
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {!projectIdParam && (
        <Select
          defaultValue={projectId ?? undefined}
          onValueChange={(value) => onProjectChange(value)}
          disabled={!projects?.data?.project}
        >
          <SelectTrigger className="h-8 w-full lg:w-auto">
            <div className="flex items-center pr-2">
              <Folder className="sizes-2 mr-2" />
              <SelectValue placeholder="Projetos" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">todos projetos</SelectItem>
            <SelectSeparator />
            {projects?.data?.project &&
              map(projects?.data?.project, (project) => (
                <SelectItem key={project.id} value={project.id}>
                  <div className="flex items-center gap-x-2">
                    <MemberAvatar name={project.name} className="size-6" />
                    {project.name}
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
      <DatePicker
        className="h-8 w-full lg:w-auto"
        placeholder="Data de vencimento"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(value) => setFilter({ dueDate: value ? value.toISOString() : null })}
      />
    </div>
  );
};
