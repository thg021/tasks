'use client';
import { useForm } from 'react-hook-form';
import { map } from 'lodash';
import { Loader } from 'lucide-react';
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
import { useGetStatusProject } from '@/features/projects/api/use-get-status-project';
import { useParamProjectId } from '@/features/projects/hooks/use-param-project-id';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTask } from '../api/use-create-task';
import { createInitialTaskSchema, type CreateInitialTaskSchemaProps } from '../schemas';

type CreateInitialTaskFormProps = {
  onCancel?: () => void;
};
export const CreateInitialTaskForm = ({ onCancel }: CreateInitialTaskFormProps) => {
  const workspaceId = useWorkspaceId();
  const projectId = useParamProjectId();
  const { mutate: createTask, isPending: isPendingCreateTask } = useCreateTask();
  const { data: listStatus, isLoading: isLoadingStatus } = useGetStatusProject({ projectId });

  const form = useForm<CreateInitialTaskSchemaProps>({
    resolver: zodResolver(createInitialTaskSchema),
    defaultValues: {
      name: '',
      url: ''
    }
  });

  const onSubmit = (values: CreateInitialTaskSchemaProps) => {
    const finalValues = {
      ...values,
      projectId,
      workspaceId
    };

    createTask(finalValues, {
      onSuccess: () => {
        form.reset();
        onCancel?.();
      },
      onError: (error) => {
        console.error(error);
      }
    });
  };

  if (isLoadingStatus) {
    return (
      <Card className="size-full border-none shadow-none">
        <CardContent>
          <Loader className="size-3 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Criar uma nova tarefa</CardTitle>
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
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="url"
                          disabled={isPendingCreateTask}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Nome"
                          disabled={isPendingCreateTask}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        disabled={isPendingCreateTask}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          {map(listStatus?.data, (status) => (
                            <SelectItem key={status.id} value={status.name}>
                              <div className="flex items-center gap-x-2">{status.name}</div>
                            </SelectItem>
                          ))}
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
                type="button"
                onClick={onCancel}
                size="lg"
                variant="secondary"
                className={cn(!onCancel && 'invisible')}
              >
                Cancelar
              </Button>
              <Button size="lg" type="submit" disabled={isPendingCreateTask}>
                Criar tarefa
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
