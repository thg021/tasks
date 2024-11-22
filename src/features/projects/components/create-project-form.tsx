'use client';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCreateProject } from '@/features/projects/api/use-create-project';
import {
  createProjectSchema,
  type CreateProjectSchemaProps
} from '@/features/projects/schemas';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

type CreateProjectFormProps = {
  onCancel?: () => void;
};
export const CreateProjectForm = ({ onCancel }: CreateProjectFormProps) => {
  const { mutate: createProject, isPending } = useCreateProject();
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const form = useForm<CreateProjectSchemaProps>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = (values: CreateProjectSchemaProps) => {
    const finalValues = {
      name: values.name,
      workspaceId
    };
    createProject(finalValues, {
      onSuccess: ({ data }) => {
        form.reset();
        router.push(`/workspaces/${workspaceId}/projects/${data.id}`);
      },
      onError: (error) => {
        console.error(error);
      }
    });
  };

  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Criar um novo projeto
        </CardTitle>
      </CardHeader>
      <div className=" px-7 ">
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
                        <Input {...field} placeholder="Nome" disabled={false} />
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
                Criar projeto
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
