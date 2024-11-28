'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useDeleteProject } from '@/features/projects/api/use-delete-project';
import { useEditProject } from '@/features/projects/api/use-edit-project';
import { useParamProjectId } from '@/features/projects/hooks/use-param-project-id';
import { updateProjectSchema, type UpdateProjectSchemaProps } from '@/features/projects/schemas';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useConfirm } from '@/hooks/use-confirm';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

type EditProjectFormProps = {
  onCancel?: () => void;
  initialValues?: {
    workspaceId: string;
    id: string;
    name: string;
    created: Date;
    updated: Date;
  };
};
export const EditProjectForm = ({ onCancel, initialValues }: EditProjectFormProps) => {
  const router = useRouter();
  //TODO: implementar o zustand por precisaremos das informações do project para popular o formulario de edição
  const { mutate: EditProject, isPending } = useEditProject();
  const { mutate: DeleteProject } = useDeleteProject();
  const [DeleteDialog, confirmDelete] = useConfirm(
    'Excluir um projeto',
    'Tem certeza que deseja excluir um projeto?',
    'destructive'
  );
  const workspaceId = useWorkspaceId();
  const projectId = useParamProjectId();

  const form = useForm<UpdateProjectSchemaProps>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      ...initialValues
    }
  });

  const onSubmit = (values: UpdateProjectSchemaProps) => {
    const finalValues = {
      name: values.name,
      workspaceId,
      projectId
    };
    EditProject(finalValues, {
      onSuccess: () => {
        //form.reset();
      },
      onError: (error) => {
        console.error(error);
      }
    });
  };

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    DeleteProject(
      { param: { projectId: projectId || '' } },
      {
        onSuccess: () => {
          router.push(`/${workspaceId}`);
          window.location.href = '/';
        },
        onError: (error) => {
          console.error(error);
        }
      }
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      <DeleteDialog />
      <Card className="size-full border border-zinc-300 shadow-none">
        <CardHeader className="flex p-7">
          <CardTitle className="text-xl font-bold">Edit o projeto</CardTitle>
        </CardHeader>
        <div className="px-7">
          <Separator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col space-y-2">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Nome" disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Button
                  onClick={onCancel}
                  size="lg"
                  variant="secondary"
                  className={cn(!onCancel && 'invisible')}
                >
                  Cancelar
                </Button>
                <Button size="lg" type="submit" disabled={false}>
                  salvar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

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
            <Button type="button" onClick={handleDelete} size="lg" variant="outline">
              Deletar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
