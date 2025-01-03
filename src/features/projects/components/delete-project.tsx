'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useDeleteProject } from '@/features/projects/api/use-delete-project';
import { useParamProjectId } from '@/features/projects/hooks/use-param-project-id';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useConfirm } from '@/hooks/use-confirm';

export const DeleteProject = () => {
  const router = useRouter();
  const { mutate: deleteProject } = useDeleteProject();
  const [DeleteDialog, confirmDelete] = useConfirm(
    'Excluir um projeto',
    'Tem certeza que deseja excluir um projeto?',
    'destructive'
  );
  const workspaceId = useWorkspaceId();
  const projectId = useParamProjectId();

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    deleteProject(
      { param: { projectId: projectId || '' } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}`);
        },
        onError: (error) => {
          console.error(error);
        }
      }
    );
  };

  return (
    <div className="flex flex-col">
      <DeleteDialog />

      <Card className="size-full border border-zinc-300 shadow-none">
        <CardHeader className="flex px-7">
          <CardTitle className="text-xl font-bold">Danger zone</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 px-7">
          <p className="text-sm text-zinc-600">
            Ao deletar um projeto, todos os seus dados serão perdidos
          </p>
          <Separator />
          <div className="flex items-center justify-end">
            <Button type="button" onClick={handleDelete} size="lg" variant="destructive">
              Deletar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
