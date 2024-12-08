'use client';
import { useForm } from 'react-hook-form';
import { Loader } from 'lucide-react';
import { DatePicker } from '@/components/date-pircket';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTask } from '../api/use-create-task';
import { createTaskSchema, type CreateTaskSchema } from '../schemas';

type CreateTaskFormProps = {
  onCancel?: () => void;
};
export const CreateTaskForm = ({ onCancel }: CreateTaskFormProps) => {
  const workspaceId = useWorkspaceId();
  const { isPending } = useCreateTask();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });

  //const router = useRouter();

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = () => {
    // const finalValues = {
    //   name: values.name,
    //   workspaceId
    // };
    // createProject(finalValues, {
    //   onSuccess: ({ data }) => {
    //     form.reset();
    //     router.push(`/workspaces/${workspaceId}/projects/${data.id}`);
    //   },
    //   onError: (error) => {
    //     console.error(error);
    //   }
    // });
  };

  if (isLoadingProjects) {
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
        <pre>{JSON.stringify(projects, null, 2)}</pre>
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
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DatePicker {...field} />
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
                Criar tarefa
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
