'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Avatar, { type AvatarConfig } from 'react-nice-avatar';
import { Square } from 'lucide-react';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { type AvatarFormData } from '../schemas';
type EditAvatarProps = {
  onCancel?: () => void;
};

export const EditAvatarForm = ({ onCancel }: EditAvatarProps) => {
  const [configAvatar, setConfigAvatar] = useState<AvatarConfig>({
    faceColor: '#F9C9B6', //#AC6651
    sex: 'man', // 'woman',
    earSize: 'big',
    hairStyle: 'thick',
    eyeStyle: 'oval',
    glassesStyle: 'round',
    noseStyle: 'long',
    mouthStyle: 'peace',
    shirtStyle: 'polo',
    hatStyle: 'none',
    bgColor: '#c9c9c9'
  });

  const form = useForm<AvatarFormData>({
    defaultValues: {
      ...configAvatar
    }
  });

  useEffect(() => {
    const subscription = form.watch((value) =>
      setConfigAvatar((oldState) => ({ ...oldState, ...value }))
    );
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (values: AvatarFormData) => {
    // TODO: usar esta var hideProjectFilter
    // eslint-disable-next-line no-console
    console.log(values);
    // Save avatar to the user's profile
    // Then, update the avatar image in the avatar field
    onCancel?.();
  };

  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-start gap-x-4 p-2">
        <CardTitle className="text-xl font-bold">Editar avatar</CardTitle>
      </CardHeader>
      <div className="px-2">
        <Separator />
      </div>
      <CardContent className="flex flex-col gap-y-6">
        <div className="py-8">
          <Avatar className="mx-auto size-32" {...configAvatar} shape="rounded" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ScrollArea className="h-[200px] rounded-md border p-4">
              <div className="flex flex-col space-y-2">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="faceColor"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="w-8/12">Sexo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleciona uma opção" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="#F9C9B6" className="w-full">
                              <div className="flex flex-row items-center justify-between gap-x-4">
                                <Square fill="#F9C9B6" className="size-4 text-[#F9C9B6]" />
                                Branco
                              </div>
                            </SelectItem>
                            <SelectItem value="#AC6651" className="w-full">
                              <div className="flex flex-row items-center justify-between gap-x-4">
                                <Square fill="#AC6651" className="size-4 text-[#AC6651]" />
                                Negro
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="w-8/12">Sexo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleciona uma opção" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="man">Homem</SelectItem>
                            <SelectItem value="woman">Mulher</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="earSize"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="w-8/12">Estilo da orelha</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleciona um estilo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="small">Pequena</SelectItem>
                            <SelectItem value="big">Grande</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hairStyle"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="w-8/12">Estilo do cabelo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um estilo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="thick">Grosso</SelectItem>
                            <SelectItem value="mohawk">Moicano</SelectItem>
                            <SelectItem value="womanLong">Mulher - Longo</SelectItem>
                            <SelectItem value="womanShort">Mulher - curto</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hatStyle"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="w-8/12">Estilo do chapéu</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleciona o tipo de chapéu" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beanie">gorro</SelectItem>
                            <SelectItem value="turban">turbante</SelectItem>
                            <SelectItem value="none">nenhum</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="eyeStyle"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="w-8/12">Estilo dos olhos</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleciona um estilo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="circle">Redondos</SelectItem>
                            <SelectItem value="oval">Ovais</SelectItem>
                            <SelectItem value="smile">Sorrindo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="glassesStyle"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="w-8/12">Óculos</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleciona o tipo de chapéu" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="round">Redondos</SelectItem>
                            <SelectItem value="square">Quadrado</SelectItem>
                            <SelectItem value="none">Nenhum</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="noseStyle"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="w-8/12">Estilo do nariz</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleciona um estilo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="short">Pequeno</SelectItem>
                            <SelectItem value="long">Grande</SelectItem>
                            <SelectItem value="round">Redondo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mouthStyle"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="w-8/12">Estilo da boca</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleciona um estilo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="laugh">Rir</SelectItem>
                            <SelectItem value="smile">Sorrir</SelectItem>
                            <SelectItem value="peace">Paz</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shirtStyle"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="w-8/12">Estilo da camiseta</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleciona um estilo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hoody">Capuz</SelectItem>
                            <SelectItem value="short">Curto</SelectItem>
                            <SelectItem value="polo">Polo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </ScrollArea>

            <div className="flex items-center justify-end">
              <Button size="lg" type="submit">
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
