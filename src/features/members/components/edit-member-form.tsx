'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { map, size } from 'lodash';
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
import { useMemberIdParams } from '@/features/members/hooks/use-member-id';
import { createMemberSchema, type CreateMemberSchemaProps } from '@/features/members/schemas';
import { useWorkspaceId } from '@/features/workspaces/hooks';
import { cn } from '@/lib/utils';
import type { Member } from '@/types/db/Member';
import type { Project } from '@/types/db/Project';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateMember } from '../api/use-update-member';

type EditMemberProps = {
  onCancel?: () => void;
  initialData: Member & { projects: Project[] };
};

export const EditMemberForm = ({ onCancel, initialData }: EditMemberProps) => {
  const [selectedProject, setSelectedProject] = useState<string[]>(
    map(initialData.user?.projects, (project) => project.id)
  );
  const { mutate: updateMember } = useUpdateMember();

  const router = useRouter();

  const memberId = useMemberIdParams();
  const workspaceId = useWorkspaceId();
  const form = useForm<CreateMemberSchemaProps>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      name: initialData.user?.name as string,
      email: initialData.user?.email as string,
      projectsId:
        size(initialData.user?.projects) > 0
          ? map(initialData.user?.projects, (project) => project.id)
          : undefined
    }
  });

  const onSubmit = (values: CreateMemberSchemaProps) => {
    const finalValues = {
      json: {
        ...values,
        projectsId: [...selectedProject]
      },
      param: {
        workspaceId,
        memberId
      }
    };

    updateMember(finalValues, {
      onSuccess: () => {
        router.refresh();
        onCancel?.();
      },
      onError: (error) => {
        console.error(error);
      }
    });
  };

  const projectsWorkspaces = map(initialData.projects, (item) => ({
    value: item.id,
    label: item.name
  }));

  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-start gap-x-4 p-7">
        <Button variant="secondary" onClick={() => window.history.back()}>
          <MoveLeft className="size-4" />
        </Button>
        <CardTitle className="text-xl font-bold">{initialData.user?.name}</CardTitle>
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
                  options={projectsWorkspaces}
                  onValueChange={setSelectedProject}
                  defaultValue={selectedProject}
                  placeholder="Selecione os projetos"
                  variant="inverted"
                  modalPopover
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
              <div className="flex gap-2">
                <Button size="lg" type="submit">
                  Deletar
                </Button>
                <Button size="lg" type="submit">
                  Salvar
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
