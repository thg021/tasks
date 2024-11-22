import { useForm } from 'react-hook-form';
import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRegister } from '@/features/auth/api/use-register';
import {
  RegisterSchema,
  type RegisterSchemaProps
} from '@/features/auth/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export const SignUpCard = () => {
  const { mutate } = useRegister();
  const form = useForm<RegisterSchemaProps>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  });

  const onSubmit = (values: RegisterSchemaProps) => {
    mutate(values);
  };

  return (
    <Card className="size-full border-none shadow-none md:w-[487px]">
      <CardHeader>
        <CardTitle>Criar nova conta</CardTitle>
      </CardHeader>
      <div className="mb-6 flex flex-col space-y-4 px-7">
        <DottedSeparator />
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
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="email@mail.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="****" type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button size="lg">Login</Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
};
