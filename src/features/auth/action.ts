'use server'
import { redirect as redirectNext } from "next/navigation";
import { cookies } from "next/headers";

import { AUTH_COOKIE } from "@/features/auth/constants";
import { servicesAPPWRITE } from "@/lib/appwrite";

type GetUserCurrentSession = {
    redirect?: boolean 
}
export const getUserCurrentSession = async (opts?: GetUserCurrentSession ) => {
  const redirect = opts?.redirect ?? true
  try {
    const session = await cookies().get(AUTH_COOKIE)
    if (!session) {
      return redirect ? redirectNext("/sign-in") : null
    }
    
    const { account } = servicesAPPWRITE(session.value)
    return await account.get()
  } catch (error) {
    console.error(error)
    return null
  }
}