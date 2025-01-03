'use client';
import { useForm } from 'react-hook-form';
import { map } from 'lodash';
import { Loader } from 'lucide-react';
import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from '@/components/ui/textarea';
import { MemberAvatar } from '@/features/members/components/member-avatar';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useParamProjectId } from '@/features/projects/hooks/use-param-project-id';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTask } from '../api/use-create-task';
import { createTaskSchema, type CreateTaskSchemaProps } from '../schemas';
import { TaskStatus } from '../types';

type CreateTaskFormProps = {
  onCancel?: () => void;
};
export const CreateTaskForm = ({ onCancel }: CreateTaskFormProps) => {
  const workspaceId = useWorkspaceId();
  const projectId = useParamProjectId();
  const { mutate: createTask } = useCreateTask();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });

  const projectSelected = projectId
    ? projects?.data?.project.filter((project) => project.id === projectId)
    : projects?.data?.project;

  const workspaceSelected = workspaceId
    ? projects?.data?.workspace.filter((workspace) => workspace.id === workspaceId)
    : projects?.data?.workspace;

  const form = useForm<CreateTaskSchemaProps>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: '',
      projectId: projectId || '',
      assignedId: '',
      status: TaskStatus.TODO,
      description: '',
      workspaceId: workspaceId || ''
    }
  });

  const onSubmit = (values: CreateTaskSchemaProps) => {
    const finalValues = {
      ...values
    };

    createTask(finalValues, {
      onSuccess: () => {
        form.reset();
        //redirect for new task
        onCancel?.();
      },
      onError: (error) => {
        console.error(error);
      }
    });
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col space-y-2">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
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
                        <Input {...field} type="text" placeholder="Nome" disabled={false} />
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
                      <FormLabel>Data de vencimento</FormLabel>
                      <FormControl>
                        <DatePicker {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assignedId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsável</FormLabel>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a pessoa" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
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
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Projeto</FormLabel>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o projeto" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          {projectSelected &&
                            map(projectSelected, (project) => (
                              <SelectItem key={project.id} value={project.id}>
                                <div className="flex items-center gap-x-2">
                                  <MemberAvatar name={project.name} className="size-6" />
                                  {project.name}
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workspaceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace</FormLabel>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o workspace" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          {workspaceSelected &&
                            map(workspaceSelected, (workspace) => (
                              <SelectItem key={workspace.id} value={workspace.id}>
                                <div className="flex items-center gap-x-2">
                                  <MemberAvatar name={workspace.name} className="size-6" />
                                  {workspace.name}
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Descrição" className="h-60 resize-none" {...field} />
                      </FormControl>
                      <FormDescription>
                        Uma descrição breve sobre a task ajuda no entendimento da tarefa.
                      </FormDescription>
                      <FormMessage />
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
              <Button size="lg" type="submit" disabled={isLoadingProjects}>
                Criar tarefa
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
