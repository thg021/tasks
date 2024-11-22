import NextAuth from 'next-auth';
import { getUserById } from '@/features/auth/services/user';
import authConfig from '@/lib/auth.config';
import { db } from '@/lib/db.prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: true,
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-in',
    error: '/error'
  },
  events: {
    // async linkAccount({ user }) {
    //   await db.user.update({
    //     where: { id: user.id },
    //     data: { emailVerified: new Date() },
    //   });
    // },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;
      const existingUser = await getUserById(user.id!);
      if (!existingUser) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    }
  },
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(db),
  ...authConfig
});
