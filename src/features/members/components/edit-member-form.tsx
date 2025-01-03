'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiAddCircleFill } from 'react-icons/ri';
import Avatar, { genConfig, type AvatarConfig } from 'react-nice-avatar';
import { useRouter } from 'next/navigation';
import { map, size } from 'lodash';
import { PencilLine } from 'lucide-react';
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
import { useAvatarModal } from '../hooks/use-avatar-modal';

type EditMemberProps = {
  onCancel?: () => void;
  initialData: Member & { projects: Project[] };
};

export const EditMemberForm = ({ onCancel, initialData }: EditMemberProps) => {
  const [selectedProject, setSelectedProject] = useState<string[]>(
    map(initialData.user?.projects, (project) => project.id)
  );

  const { setIsOpen } = useAvatarModal();

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

  const config = genConfig({ ...(initialData.user?.avatar as AvatarConfig) });
  const hasAvatarConfigured = initialData.user?.avatar;
  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-start gap-x-4 p-7">
        <CardTitle className="text-xl font-bold">{initialData.user?.name}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-7">
        <div className="flex items-end gap-x-4 py-6">
          {hasAvatarConfigured ? (
            <Avatar className="size-24" {...config} shape="rounded" />
          ) : (
            <div className="flex size-24 items-center justify-center rounded-sm bg-gray-200">
              <p className="text-4xl font-bold uppercase text-gray-800">
                {initialData.user?.name?.substring(0, 2)}
              </p>
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-gray-600">Avatar do perfil</p>
            <Button
              size="sm"
              variant="outline"
              className="mt-2 w-full"
              onClick={() => setIsOpen(true)}
            >
              {hasAvatarConfigured ? (
                <>
                  <PencilLine className="size-4 text-gray-600" />
                  Editar
                </>
              ) : (
                <>
                  <RiAddCircleFill className="size-4 text-gray-600" />
                  Adicionar
                </>
              )}
            </Button>
          </div>
        </div>

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
                <h1 className="text-lg font-semibold text-gray-800">Projetos</h1>
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
