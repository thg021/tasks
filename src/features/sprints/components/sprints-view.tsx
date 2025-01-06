'use client';
import { DataTable } from '@/components/data-table';
import { useParamProjectId } from '@/features/projects/hooks/use-param-project-id';
import { useGetSprintByProjectId } from '../api/use-get-sprint-by-project-id';
import { columns } from './columns';

export const SprintsView = () => {
  const paramProjectId = useParamProjectId();
  const { data: sprints } = useGetSprintByProjectId({ projectId: paramProjectId });

  return (
    <div className="w-full">
      <DataTable.Root columns={columns} data={sprints?.data || []}>
        <DataTable.Container>
          <DataTable.Header />
          <DataTable.Body />
        </DataTable.Container>
        <DataTable.Pagination />
      </DataTable.Root>
    </div>
  );
};
