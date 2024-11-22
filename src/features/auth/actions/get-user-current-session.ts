'use server';
import { redirect as redirectNext } from 'next/navigation';
import { auth } from '@/lib/auth';

type GetUserCurrentSession = {
    redirect?: boolean 
    redirectUrl?: string
}


/**
 * Retrieves the current user session from the authentication provider.
 *
 * @param opts - An optional object with a `redirect` property that determines whether to redirect the user to the sign-in page if no session is found.
 * @returns The current user's session, or `null` if no session is found and `redirect` is `false`.
 * @throws An error if the session is missing.
 */
export const getUserCurrentSession = async (opts?: GetUserCurrentSession ) => {
  const redirect = opts?.redirect ?? true;
  const redirectUrl = opts?.redirectUrl ?? '/sign-in';
  try {

    const session = await auth();

    if (!session?.user) {
      return redirect ? redirectNext(redirectUrl) : null;
    }
    return session?.user;
  } catch (error) {
    console.error(error);
    throw new Error('Session is missing');
  }
};