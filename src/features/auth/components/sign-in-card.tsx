import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginSchemaProps } from "@/features/auth/schemas";
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
import { useLogin } from "../api/use-login";

export const SignInCard = () => {
  const { mutate } = useLogin();
  const form = useForm<LoginSchemaProps>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginSchemaProps) => {
    mutate(values, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <Card className="size-full md:w-[487px] border-none shadow-none">
      <CardHeader>
        <CardTitle>Bem vindo de volta</CardTitle>
      </CardHeader>
      <div className="flex space-y-4 flex-col px-7 mb-6">
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
