'use client';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { loginAction } from '@/features/auth/actions/login';
import { LoginSchema, type LoginSchemaProps } from '@/features/auth/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export const SignInCard = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const session = useSession();
  if (session.data && session.status === 'authenticated') {
    router.push('/');
  }
  const form = useForm<LoginSchemaProps>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: LoginSchemaProps) => {
    startTransition(() => {
      loginAction(values);
    });
  };

  return (
    <Card className="size-full border-none shadow-none md:w-[487px]">
      <CardHeader>
        <CardTitle>Bem vindo de volta</CardTitle>
      </CardHeader>
      <div className="mb-6 flex flex-col space-y-4 px-7">
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col space-y-2">
              <div className="space-y-4">
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
                          disabled={isPending}
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
                        <Input {...field} placeholder="****" type="password" disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button size="lg" disabled={isPending}>
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
};
