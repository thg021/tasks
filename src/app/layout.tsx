import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import QueryProvider from '@/providers/query-provider';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'Generated by create next app'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-screen antialiased')}>
        <SessionProvider session={session}>
          <QueryProvider>
            <Toaster
              toastOptions={{
                classNames: {
                  error: 'bg-red-400',
                  success: 'border-none bg-emerald-100 text-emerald-600',
                  warning: 'text-yellow-400',
                  info: 'bg-blue-400'
                }
              }}
            />
            {children}
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
