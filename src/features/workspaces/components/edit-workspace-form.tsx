'use client';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ImageIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  updateWorkspaceSchema,
  type UpdateWorkspaceSchemaProps
} from '@/features/workspaces/schemas';
import type { Workspace } from '@/features/workspaces/types';
import { useConfirm } from '@/hooks/use-confirm';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDeleteWorkspace } from '../api/use-delete-workspaces';
import { useUpdateWorkspace } from '../api/use-update-workspaces';

type EditWorkspaceFormProps = {
  onCancel?: () => void;
  initialValues: Workspace;
};
export const EditWorkspaceForm = ({ onCancel, initialValues }: EditWorkspaceFormProps) => {
  const { mutate: updateWorkspace, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } = useDeleteWorkspace();

  const [DeleteDialog, confirmDelete] = useConfirm(
    'Excluir workspace',
    'Tem certeza que deseja excluir o workspace?',
    'destructive'
  );
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UpdateWorkspaceSchemaProps>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? ''
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1048576) {
        form.setError('image', {
          type: 'manual',
          message: 'A imagem deve ter no máximo 1MB'
        });
        return;
      }

      // Limpar erro anterior se existir
      form.clearErrors('image');
      form.setValue('image', file);
    }
  };

  const handleRemoveImage = () => {
    form.setValue('image', '');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    deleteWorkspace(
      { param: { workspaceId: initialValues.id } },
      {
        onSuccess: () => {
          router.push('/');
          window.location.href = '/';
        },
        onError: (error) => {
          console.error(error);
        }
      }
    );
    // }
  };

  const onSubmit = (values: UpdateWorkspaceSchemaProps) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : undefined
    };

    updateWorkspace(
      { form: finalValues, param: { workspaceId: initialValues.id } },
      {
        onSuccess: ({ data }) => {
          form.reset({ ...data, image: data.imageUrl || '' });
          // router.refresh();
          //router.push(`/workspaces/${data.id}`);
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
      <Card className="size-full border-neutral-300 shadow-none dark:border-neutral-800">
        <CardHeader className="flex p-7">
          <CardTitle className="text-xl font-bold">{initialValues.name}</CardTitle>
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
                          <Input
                            {...field}
                            id="workspace-name"
                            placeholder="Nome"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-col gap-y-2">
                          <div className="flex items-center gap-x-5">
                            {field.value ? (
                              <div className="relative size-[72px] overflow-hidden rounded-md">
                                <button
                                  onClick={handleRemoveImage}
                                  className="group absolute top-0 z-10 flex size-[72px] cursor-pointer items-center justify-center bg-none transition-colors hover:bg-slate-900/85"
                                  disabled={isDeletingWorkspace}
                                >
                                  <span className="hidden text-xs font-bold text-white transition-all group-hover:block">
                                    Remover
                                  </span>
                                </button>
                                <Image
                                  src={
                                    field.value instanceof File
                                      ? URL.createObjectURL(field.value)
                                      : field.value
                                  }
                                  alt="logo do workspace"
                                  className="object-cover"
                                  width={72}
                                  height={72}
                                />
                              </div>
                            ) : (
                              <Avatar className="size-[72px]">
                                <AvatarFallback>
                                  <ImageIcon className="size-[36px] text-neutral-400" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className="flex flex-col">
                              <p className="text-sm">Icone do workspace</p>
                              <p className="text-sm text-muted-foreground">
                                JPG, PNG, SVG ou JPEG, max 1MB
                              </p>
                              <FormControl>
                                <input
                                  className="hidden"
                                  type="file"
                                  id="workspace-image"
                                  ref={inputRef}
                                  accept=".jpg, .jpeg, .png, .svg"
                                  disabled={isPending}
                                  onChange={handleImageChange}
                                />
                              </FormControl>

                              <Button
                                type="button"
                                disabled={isPending}
                                variant="outline"
                                size="icon"
                                className="mt-2 w-fit px-2"
                                onClick={() => inputRef.current?.click()}
                              >
                                Upload image
                              </Button>
                            </div>
                          </div>
                        </div>
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

                <Button size="lg" type="submit" disabled={isPending}>
                  Atualizar workspace
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="size-full border-neutral-300 shadow-none dark:border-neutral-800">
        <CardHeader className="flex px-7">
          <CardTitle className="text-xl font-bold">Danger zone</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 px-7">
          <p className="text-sm text-zinc-600">
            Ao deletar um workspace, todos os seus dados serão perdidos
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
