'use server';

import { AuthError } from 'next-auth';
import { LoginSchema, type LoginSchemaProps } from '@/features/auth/schemas';
import { getUserByEmail } from '@/features/auth/services/user';
import { signIn } from '@/lib/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

const AUTH_MESSAGES = {
  INVALID_FIELDS: 'Campos inválidos',
  INVALID_CREDENTIALS: 'Email/Senha inválidos',
  ACCESS_DENIED: 'Acesso negado',
  UNKNOWN_ERROR: 'Alguma coisa deu errada',
  SUCCESS: 'Login realizado com sucesso!'
} as const;


export const loginAction = async (
  values: LoginSchemaProps
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return { status: 'error', message: AUTH_MESSAGES.INVALID_FIELDS };
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if(!existingUser){
    return { status: 'error', message:  AUTH_MESSAGES.INVALID_CREDENTIALS  };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });

    return { 
      status: 'success', 
      message: AUTH_MESSAGES.SUCCESS 
    };

  } catch (error) {
     if (error instanceof AuthError) {
      const errorMessages = {
        CredentialsSignin: AUTH_MESSAGES.INVALID_CREDENTIALS,
        AccessDenied: AUTH_MESSAGES.ACCESS_DENIED
      };

      return {
        status: 'error',
        message: errorMessages[error.type as keyof typeof errorMessages] || AUTH_MESSAGES.UNKNOWN_ERROR
      };
    }

    throw error;
  }
};
