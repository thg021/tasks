//types/next-auth.d.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth';
import type { UserRole } from '@prisma/client';

export type ExtendedUser = DefaultSession['user'] & {
  id: string;
  role: UserRole;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    role?: UserRole;
  }
}
