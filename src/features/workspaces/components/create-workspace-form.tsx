"use client";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type CreateWorkspaceFormProps = {
  onCancel?: () => void;
};
export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const { mutate: createWorkspace, isPending } = useCreateWorkspace();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CreateWorkspaceSchemaProps>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  const onSubmit = (values: CreateWorkspaceSchemaProps) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : undefined,
    };
    createWorkspace(finalValues, {
      onSuccess: ({ data }) => {
        form.reset();
        router.push(`/workspaces/${data.id}`);
      },
      onError: (error) => {
        console.error(error);
      },
    });
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
                        <Input
                          {...field}
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
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <div
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                              className="bg-none group flex transition-colors hover:bg-slate-900/85 size-[72px] absolute cursor-pointer  top-0 z-10 items-center justify-center"
                            >
                              <span className="text-xs text-white font-bold hidden group-hover:block transition-all">
                                Remover
                              </span>
                            </div>
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
                          <input
                            className="hidden"
                            type="file"
                            ref={inputRef}
                            accept=".jpg, .jpeg, .png, .svg"
                            disabled={isPending}
                            onChange={handleImageChange}
                          />
                          <Button
                            type="button"
                            disabled={isPending}
                            variant="outline"
                            size="icon"
                            className="w-fit mt-2 px-2"
                            onClick={() => inputRef.current?.click()}
                          >
                            Upload image
                          </Button>
                        </div>
                      </div>
                    </div>
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
                className={cn(!onCancel && "invisible")}
              >
                Cancelar
              </Button>
              <Button size="lg" type="submit" disabled={isPending}>
                Criar workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
