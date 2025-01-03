'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { size } from 'lodash';
import { Ban, Circle } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useParamProjectId } from '@/features/projects/hooks/use-param-project-id';
import {
  createStatusProjectSchema,
  type CreateStatusSchemaProps
} from '@/features/projects/schemas';
import { useConfirm } from '@/hooks/use-confirm';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateStatusProject } from '../api/use-create-status-project';
import { useDeleteStatusProject } from '../api/use-delete-status-project';
import { useGetStatusProject } from '../api/use-get-status-project';
import { useReorderStatusProject } from '../api/use-reorder-status-project';
import { StatusListProject } from './status-list-project';

type StatusProjectFormProps = {
  onCancel?: () => void;
};
export const StatusProjectForm = ({ onCancel }: StatusProjectFormProps) => {
  const [DeleteDialog, confirmDelete] = useConfirm(
    'Excluir status',
    'Tem certeza que deseja excluir o status?',
    'destructive'
  );
  const projectId = useParamProjectId();
  const router = useRouter();
  //TODO: implementar o zustand por precisaremos das informações do project para popular o formulario de edição
  const { mutate: createStatus, isPending } = useCreateStatusProject();
  const { mutate: deleteStatus } = useDeleteStatusProject();
  const { mutate: reorderStatus } = useReorderStatusProject();
  const { data: getStatusProject, isLoading: isLoadingStatusProject } = useGetStatusProject({
    projectId
  });

  const form = useForm<CreateStatusSchemaProps>({
    resolver: zodResolver(createStatusProjectSchema),
    defaultValues: {
      name: '',
      color: '#6b7280'
    }
  });

  const onSubmit = (values: CreateStatusSchemaProps) => {
    values.color = values?.color || '#6b7280';
    createStatus({ json: values, param: { projectId } });
    form.reset();
  };

  async function handleReorder(
    updateData: { id: string; position: number; positionOriginal: number }[]
  ) {
    reorderStatus({
      json: updateData,
      param: { projectId }
    });
    router.refresh();
  }

  const handleDeleteStatusProject = async (statusId: string) => {
    const ok = await confirmDelete();
    if (!ok) return;

    deleteStatus({
      param: {
        projectId,
        statusId
      }
    });
  };

  const hasStatusProject =
    !isLoadingStatusProject && getStatusProject?.data && size(getStatusProject?.data) > 0;

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <Card className="size-full border border-zinc-300 shadow-none">
        <CardHeader className="flex flex-col items-start justify-start p-4">
          <CardTitle className="text-xl font-bold">Status</CardTitle>
          <p className="text-sm text-zinc-600">
            Gerenciamento dos status do projeto. A ordem escolhida aqui irá se refletir no quadro
            kanban
          </p>
        </CardHeader>

        <Separator className="w-full" />

        <CardContent className="p-7">
          <div className="grid grid-cols-[minmax(250px,_350px)_1fr] space-x-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col space-y-2">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nome" disabled={isPending} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            disabled={isPending}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o status" />
                              </SelectTrigger>
                            </FormControl>
                            <FormMessage />
                            <SelectContent>
                              <SelectItem value="#6b7280">
                                <Circle fill="#6b7280" className="size-6 text-gray-500" />
                              </SelectItem>
                              <SelectItem value="#10b981">
                                <Circle fill="#10b981" className="size-6 text-emerald-500" />
                              </SelectItem>
                              <SelectItem value="#eab308">
                                <Circle fill="#eab308" className="size-6 text-yellow-500" />
                              </SelectItem>
                              <SelectItem value="#0ea5e9">
                                <Circle fill="#0ea5e9" className="size-6 text-sky-500" />
                              </SelectItem>
                              <SelectItem value="#ef4444">
                                <Circle fill="#ef4444" className="size-6 text-red-500" />
                              </SelectItem>
                            </SelectContent>
                          </Select>
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
                  <Button size="lg" type="submit" disabled={isPending}>
                    Criar
                  </Button>
                </div>
              </form>
            </Form>
            <div className="flex flex-col gap-y-4">
              <h2 className="text-lg font-semibold">Ajuste a ordem de status</h2>
              <div>
                {isLoadingStatusProject && !getStatusProject && <p>Loading...</p>}
                {hasStatusProject && (
                  <StatusListProject
                    items={getStatusProject?.data || []}
                    onReorder={handleReorder}
                    onDelete={handleDeleteStatusProject}
                    onEdit={() => {}}
                  />
                )}
                {!hasStatusProject && (
                  <div className="mt-12 flex flex-col items-center justify-center gap-y-6">
                    <Ban className="size-8 text-gray-600" />
                    <p className="text-base text-gray-600">Nenhum status cadastrado</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
