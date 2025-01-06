'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { filter, first, map } from 'lodash';
import { Copy, Loader, PencilLineIcon, PencilOffIcon } from 'lucide-react';
import { toast } from 'sonner';
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
import { Textarea } from '@/components/ui/textarea';
import { MemberAvatar } from '@/features/members/components/member-avatar';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateTask } from '../api/use-update-task';
import { editTaskSchema, type EditTaskSchemaProps } from '../schemas';
import { TaskStatus, type Task } from '../types';

type EditTaskFormProps = {
  initialValue: Task;
  edit?: boolean;
};
export const EditTaskForm = ({ initialValue, edit = false }: EditTaskFormProps) => {
  const [isFormVisible, setFormVisible] = useState(edit);
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { mutate: updateTask } = useUpdateTask();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });

  const form = useForm<EditTaskSchemaProps>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      id: initialValue.id,
      name: initialValue.name,
      description: initialValue.description || undefined,
      dueDate: initialValue?.dueDate ? new Date(initialValue.dueDate) : undefined,
      projectId: initialValue.projectId || undefined,
      workspaceId: initialValue.workspaceId || undefined,
      url: initialValue.url || undefined,
      status: initialValue.status as TaskStatus,
      assignedId: initialValue.assignedId || undefined,
      userStoryId: initialValue.userStoryId || undefined
    }
  });

  const onSubmit = (values: Partial<EditTaskSchemaProps>) => {
    const json = {
      ...values
    };

    updateTask(
      { json, param: { taskId: values.id! } },
      {
        onSuccess: () => {
          //redirect for new task
          setFormVisible(false);
          router.refresh();
        },
        onError: (error) => {
          console.error(error);
        }
      }
    );
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

  const handleCopyUrl = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Link copiado para a área de transferência.');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const createdAtTask = new Date(initialValue.createdAt).toDateString();
  const project = filter(projects?.data.project, (item) => item.id === initialValue.projectId);
  const workspace = filter(
    projects?.data.workspace,
    (item) => item.id === initialValue.workspaceId
  );

  const member = filter(projects?.data.member, (item) => item.id === initialValue.assignedId);
  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="flex px-7">
        <span className="text-xs text-gray-400">
          {initialValue.status} - {createdAtTask}
        </span>
        <div className="flex flex-row items-center justify-start gap-x-4">
          <CardTitle className="text-4xl font-semibold">{initialValue.name}</CardTitle>
          <Button type="button" variant="secondary" onClick={() => setFormVisible(!isFormVisible)}>
            {!isFormVisible ? (
              <PencilLineIcon className="size-4" />
            ) : (
              <PencilOffIcon className="size-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex h-12 flex-row items-center space-x-4 space-y-0">
                    <FormLabel className="text-grey-700 w-32 text-sm">Status:</FormLabel>

                    <span
                      data-visible={isFormVisible}
                      className="hidden items-center data-[visible=false]:flex"
                    >
                      {field.value}
                    </span>

                    {isFormVisible && (
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
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userStoryId"
                render={({ field }) => (
                  <FormItem className="flex h-12 flex-row items-center space-x-4 space-y-0">
                    <FormLabel className="text-grey-700 w-32 text-sm">US:</FormLabel>
                    <div
                      data-visible={isFormVisible}
                      className="hidden flex-row items-center gap-x-4 data-[visible=false]:flex"
                    >
                      <span className="items-center">{initialValue.userStoryId}</span>
                      {initialValue.userStoryId && (
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => handleCopyUrl(initialValue.userStoryId || '')}
                        >
                          <Copy className="size-4" />
                        </Button>
                      )}
                    </div>

                    {isFormVisible && (
                      <>
                        <FormControl>
                          <Input {...field} type="text" placeholder="US" disabled={false} />
                        </FormControl>
                        <FormMessage />
                      </>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex h-12 flex-row items-center space-x-4 space-y-0">
                    <FormLabel className="text-grey-700 w-32 text-sm">Url:</FormLabel>
                    <div
                      data-visible={isFormVisible}
                      className="hidden flex-row items-center gap-x-4 data-[visible=false]:flex"
                    >
                      <span className="items-center">{field.value}</span>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => handleCopyUrl(initialValue.url || '')}
                      >
                        <Copy className="size-4" />
                      </Button>
                    </div>

                    {isFormVisible && (
                      <>
                        <FormControl>
                          <Input {...field} type="text" placeholder="URL" disabled={false} />
                        </FormControl>
                        <FormMessage />
                      </>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex h-12 flex-row items-center space-x-4 space-y-0">
                    <FormLabel className="text-grey-700 w-32 text-sm">Nome</FormLabel>
                    <span
                      data-visible={isFormVisible}
                      className="hidden items-center data-[visible=false]:flex"
                    >
                      {field.value}
                    </span>
                    {isFormVisible && (
                      <>
                        <FormControl>
                          <Input {...field} type="text" placeholder="Nome" disabled={false} />
                        </FormControl>
                        <FormMessage />
                      </>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex h-12 flex-row items-center space-x-4 space-y-0">
                    <FormLabel className="text-grey-700 w-32 text-sm">Data de vencimento</FormLabel>
                    <span
                      data-visible={isFormVisible}
                      className="hidden items-center data-[visible=false]:flex"
                    >
                      {field.value ? field.value.toDateString() : ''}
                    </span>
                    {isFormVisible && (
                      <>
                        <FormControl>
                          <DatePicker {...field} />
                        </FormControl>
                        <FormMessage />
                      </>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignedId"
                render={({ field }) => (
                  <FormItem className="flex h-12 flex-row items-center space-x-4 space-y-0">
                    <FormLabel className="text-grey-700 w-32 text-sm">Responsável</FormLabel>
                    <span
                      data-visible={isFormVisible}
                      className="hidden items-center data-[visible=false]:flex"
                    >
                      {first(member)?.name || ''}
                    </span>
                    {isFormVisible && (
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
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem className="flex h-12 flex-row items-center space-x-4 space-y-0">
                    <FormLabel className="text-grey-700 w-32 text-sm">Projeto</FormLabel>
                    <span
                      data-visible={isFormVisible}
                      className="hidden items-center data-[visible=false]:flex"
                    >
                      {first(project)?.name || ''}
                    </span>
                    {isFormVisible && (
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o projeto" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          {projects?.data.project &&
                            map(projects?.data.project, (project) => (
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
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workspaceId"
                render={({ field }) => (
                  <FormItem className="flex h-12 flex-row items-center space-x-4 space-y-0">
                    <FormLabel className="text-grey-700 w-32 text-sm">Workspace</FormLabel>
                    <span
                      data-visible={isFormVisible}
                      className="hidden items-center data-[visible=false]:flex"
                    >
                      {first(workspace)?.name || ''}
                    </span>
                    {isFormVisible && (
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o workspace" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          {projects?.data.workspace &&
                            map(projects?.data.workspace, (workspace) => (
                              <SelectItem key={workspace.id} value={workspace.id}>
                                <div className="flex items-center gap-x-2">
                                  <MemberAvatar name={workspace.name} className="size-6" />
                                  {workspace.name}
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <h2 className="my-4 text-2xl font-semibold">Descrição</h2>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="h-12 space-y-0">
                    <span
                      data-visible={isFormVisible}
                      className="hidden items-center data-[visible=false]:flex"
                    >
                      {field.value}
                    </span>
                    {isFormVisible && (
                      <>
                        <FormControl>
                          <Textarea
                            placeholder="Descrição"
                            className="h-auto resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Uma descrição breve sobre a task ajuda no entendimento da tarefa.
                        </FormDescription>
                        <FormMessage />
                      </>
                    )}
                  </FormItem>
                )}
              />
            </div>
            {isFormVisible && (
              <div className="mt-8 flex items-center justify-between">
                <Button size="lg" type="submit" disabled={isLoadingProjects}>
                  Atualizar tarefa
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
