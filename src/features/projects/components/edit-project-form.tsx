'use client';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useEditProject } from '@/features/projects/api/use-edit-project';
import { useParamProjectId } from '@/features/projects/hooks/use-param-project-id';
import { updateProjectSchema, type UpdateProjectSchemaProps } from '@/features/projects/schemas';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
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
  const { mutate: EditProject, isPending } = useEditProject();
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
    EditProject(finalValues);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Card className="size-full border border-zinc-300 shadow-none">
        <CardHeader className="flex flex-col items-start justify-start p-4">
          <CardTitle className="text-xl font-bold">Configurações</CardTitle>
        </CardHeader>

        <Separator className="w-full" />
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
                        <FormLabel>Nome do Projeto</FormLabel>
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
    </div>
  );
};
