"use server";

import { AuthError } from "next-auth";
import { LoginSchema, type LoginSchemaProps } from "@/features/auth/schemas";
import { getUserByEmail } from "@/features/auth/services/user";
import { signIn } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const loginAction = async (
  values: LoginSchemaProps
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return { status: "error", message: "Campos inválidos" };
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if(!existingUser){
    return { status: "error", message: "Email/Senha inválidos" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", message: "Credencias invalidas" };
        case "AccessDenied":
          return { status: "error", message: "Acesso negado" };
        default:
          return { status: "error", message: "Alguma coisa deu errada" };
      }
    }

    throw error;
  }
  return { status: "success", message: "Email enviado!" };
};
