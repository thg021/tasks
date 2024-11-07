"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  createWorkspaceSchema,
  type CreateWorkspaceSchemaProps,
} from "../schemas";
import { useCreateWorkspace } from "../api/use-create-workspaces";
import { Separator } from "@/components/ui/separator";

type CreateWorkspaceFormProps = {
  onCancel?: () => void;
};
export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const { mutate: createWorkspace } = useCreateWorkspace();
  const form = useForm<CreateWorkspaceSchemaProps>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: CreateWorkspaceSchemaProps) => {
    createWorkspace(values);
  };

  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Criar um novo workspace
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
                        <Input {...field} placeholder="Nome" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Button onClick={onCancel} size="lg" variant="secondary">
                Cancelar
              </Button>
              <Button size="lg" type="submit">
                Criar workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
