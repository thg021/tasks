'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { map } from 'lodash';
import { MoveLeft } from 'lucide-react';
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
import { MultiSelect } from '@/components/ui/multi-select';
import { Separator } from '@/components/ui/separator';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateMember } from '../api/use-create-member';
import { createMemberSchema, type CreateMemberSchemaProps } from '../schemas';
type CreateMemberProps = {
  onCancel?: () => void;
};

export const CreateMemberForm = ({ onCancel }: CreateMemberProps) => {
  const [selectedProject, setSelectedProject] = useState<string[]>([]);

  const workspaceId = useWorkspaceId();
  const { data, isLoading: isLoadingProject } = useGetProjects({ workspaceId });
  const { mutate: createMember } = useCreateMember();

  const form = useForm<CreateMemberSchemaProps>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  });

  const onSubmit = (values: CreateMemberSchemaProps) => {
    const finalValues = {
      ...values,
      workspaceId,
      projectsId: [...selectedProject]
    };
    createMember(finalValues, {
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

  if (isLoadingProject) {
    return <div>Carregando</div>;
  }

  const projects = map(data?.data.project, (item) => ({ value: item.id, label: item.name }));

  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-start gap-x-4 p-7">
        <Button variant="secondary" onClick={() => window.history.back()}>
          <MoveLeft className="size-4" />
        </Button>
        <CardTitle className="text-xl font-bold">Criar um novo membro</CardTitle>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="Email" disabled={false} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <MultiSelect
                  options={projects}
                  onValueChange={setSelectedProject}
                  defaultValue={selectedProject}
                  placeholder="Selecione os projetos"
                  variant="inverted"
                  modalPopover={true}
                  maxCount={5}
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
              <Button size="lg" type="submit">
                Criar membro
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
